import { DB } from "./DBConnect.js";
DB.run(`
CREATE TABLE IF NOT EXISTS BOOKINGS (
    BOOKINGID INTEGER PRIMARY KEY AUTOINCREMENT,
    ACCOUNTID INTEGER,
    PROFILEID INTEGER,
    DOCTOR TEXT,
    ROLE TEXT,
    REASON TEXT,
    DATE TEXT,
    STATUS TEXT
)
`, (err) => {
    if (err) {
        console.log("Error creating BOOKINGS table:", err.message);
    } else {
        console.log("BOOKINGS table ready");
    }
});
import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; 
import { generateAccessToken, verifyAccessToken } from "./funcPack.js";

const app = express();
app.use(bodyParser.json()); //Allows JSON read.
//app.use(cors()); //Allow cross-origin requests.
app.use(cors({
    origin: "*"
}));

//Contains resource API endpoints.

//>>SET UP>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Port number. Currently set to 4000, local host.
//const portCode = 4000;
const portCode = process.env.PORT || 3000;

//Port listener. Logs message if successful.
app.listen(portCode, (err) => {
    if(err) console.log('Error: listen: DBAccessor: ', err.message);
    console.log('Listening on port: ', portCode);
})

//Connection test. Returns message if successful.
app.get('/', (req, res) =>{
    res.status(200).send('OK. Resource server is running...');
})

//>>API ENDPOINTS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/** /createProfile
 * Creates a new profile for the user.
 * Requires: accessToken, PROFILE, DOB, GENDER, HEIGHT, WEIGHT.
 * Success: Inserts profile data into database.
 * Success: Returns success: true, full token and a status code (200).
 * Failure: Returns success: false and a status code (400-500).
 */
app.post('/createProfile', async (req, res) => {

    //>> Set Up >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const PROFILE = req.body.PROFILE;
    const DOB = req.body.DOB;
    const GENDER = req.body.GENDER;
    const HEIGHT = req.body.HEIGHT;
    const WEIGHT = req.body.WEIGHT;

    //SQL CMD: Check if profile already exists.
    const sqlCheck = 'SELECT PROFILEID FROM USERSTATICDATA WHERE ACCOUNTID = ? AND PROFILE = ?'; 
    
    //SQL CMD: Insert new profile.
    const sql = 'INSERT INTO USERSTATICDATA(ACCOUNTID, PROFILE, DOB, GENDER, HEIGHT, WEIGHT, BMI) VALUES (? , ? , ? , ? , ? , ? , ?)'; 

    //>> Execution >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    /**
     * Steps:
     * 1. Get access token from header.
     * 2. Verify access token. Retrieve ACCOUNTID.
     * 3. Calculate BMI.
     * 4. Check if PROFILE already exists on this account.
     * 5. Add new profile to database.
     * 6. Retrieve PROFILEID of new profile.
     * 7. Create new full token.
     */

    //1. Get access token from header.
    const authHeader = req.headers['authorization']; // Express converts header names to lowercase
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const accessToken = authHeader.split(' ')[1];
        
        //2. Verify access token.
        const verificationResult = verifyAccessToken(accessToken);
        if(!verificationResult.success) return res.status(401).send({ success: false });//Err: Unauthorized: Invalid access token.
        const user = verificationResult.decoded;

        //2. Retrieve ACCOUNTID.
        const ACCOUNTID = user.ACCOUNTID;

        //3. Calculate BMI.
        const BMI = (WEIGHT / ((HEIGHT) * (HEIGHT))); //Calculate BMI.

        try{
            //4. Check if PROFILE already exists on this account.
            DB.all(sqlCheck, [ACCOUNTID, PROFILE], (err, rows) => {
                if(err) return res.status(500).send({ success: false });//Err: Server Err.
                if(rows.length > 0) return res.status(409).send({ success: false });//Err: Conflict: Profile already exists.
                
                //5. Add new profile to database.
                DB.run(sql, [ACCOUNTID, PROFILE, DOB, GENDER, HEIGHT, WEIGHT, BMI], (err) => {
                    if(err) return res.status(500).send({ success: false });//Err: Server Err.

                    //6. Retrieve PROFILEID of new profile.
                    DB.all(sqlCheck, [ACCOUNTID, PROFILE], (err, rows) => {
                        if(err) return res.status(500).send({ success: false });//Err: Server Err.

                        const PROFILEID = rows[0].PROFILEID;

                        //7. Create new full token.
                        const accessToken = generateAccessToken({ ACCOUNTID: ACCOUNTID, PROFILEID: PROFILEID });
                        return res.status(200).send({ success: true , accessToken });//Success: Profile created.
                    });
                });
            });
        } catch(err){res.status(500).send({ success: false })}//Err: Server Err.
    } else return res.status(401).send({ success: false });//Err: Unauthorized: Access token not found.
})

/* ================= BOOKINGS ================= */

app.post('/createBooking', (req, res) => {

    const { DOCTOR, ROLE, REASON, DATE } = req.body;

    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {

        const token = authHeader.split(' ')[1];
        const verification = verifyAccessToken(token);

        if (!verification.success) {
            return res.status(401).send({ success: false });
        }

        const { ACCOUNTID, PROFILEID } = verification.decoded;

        const sql = `
            INSERT INTO BOOKINGS 
            (ACCOUNTID, PROFILEID, DOCTOR, ROLE, REASON, DATE, STATUS) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        DB.run(sql, 
            [ACCOUNTID, PROFILEID, DOCTOR, ROLE, REASON, DATE, "Pending"], 
            function(err) {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ success: false });
                }

                return res.status(200).send({ success: true });
            }
        );

    } else {
        return res.status(401).send({ success: false });
    }
});


app.get('/getBookings', (req, res) => {

    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {

        const token = authHeader.split(' ')[1];
        const verification = verifyAccessToken(token);

        if (!verification.success) {
            return res.status(401).send({ success: false });
        }

        const { ACCOUNTID } = verification.decoded;

        const sql = `
            SELECT * FROM BOOKINGS WHERE ACCOUNTID = ?
            ORDER BY BOOKINGID DESC
        `;

        DB.all(sql, [ACCOUNTID], (err, rows) => {
            if (err) {
                return res.status(500).send({ success: false });
            }

            return res.status(200).send({
                success: true,
                bookings: rows
            });
        });

    } else {
        return res.status(401).send({ success: false });
    }
});

//NOT DONE
// app.post('/getProfiles', async (req, res) => {

//     const accessToken = req.body.accessToken;

//     //SQL CMD: Check if account has any profiles.
//     const sql = 'SELECT * FROM USERSTATICDATA WHERE ACCOUNTID = ?';
    
//     jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if(err) return res.status(401).send({ success: false });//Err: Unauthorized: Invalid access token.

//         try{
//             //SQL to DB: Check if email exists.
//             DB.all(sql, [user.ACCOUNTID], async (err, rows)=>{
//                 if(err) return res.status(400).send({ success: false }); //Err: Bad Req.
//                 if(rows.length == 0) return res.status(404).send({ success: false }); //Err: Not Found: no profiles found for account.
                
//                 return res.status(200).send({ success: true, profiles: rows }); //Success: Profiles found.
//             })
//         }
//         catch(err){res.status(500).send({ success: false })}//Err: Server Err.
//     })
// })