import { DB } from "./DBConnect.js";
import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config'; 

const app = express();
app.use(bodyParser.json()); //Allows JSON read.
app.use(cors()); //Allow cross-origin requests.

//Contains resource API endpoints.

//>>SET UP>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Port number. Currently set to 4000, local host.
const portCode = 4000;

//Port listener. Logs message if successful.
app.listen(portCode, (err) => {
    if(err) console.log('Error: listen: DBAccessor: ', err.message);
    console.log('Listening on port: ', portCode);
})

//Connection test. Returns message if successful.
app.get('/', (req, res) =>{
    res.status(200).send('OK. Resource server is running...');
})

//>>FUNCTIONS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // The header value is "Bearer TOKEN".
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // No token
  }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403); // Invalid token
    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
    });
    
}

//>>API ENDPOINTS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/** /createProfile
 * Creates a new profile for the user.
 * Requires: accessToken, PROFILE, DOB, GENDER, HEIGHT, WEIGHT.
 * Success: Inserts profile data into database.
 * Success: Returns success: true and a status code (200).
 * Failure: Returns success: false and a status code (400-500).
 */
app.post('/createProfile', async (req, res) => {

    const accessToken = req.body.accessToken;

    //SQL CMD: Check if profile already exists.
    const sqlCheck = 'SELECT * FROM USERSTATICDATA WHERE ACCOUNTID = ? AND PROFILE = ?'; 
    
    //SQL CMD: Insert new profile.
    const sql = 'INSERT INTO USERSTATICDATA(ACCOUNTID, PROFILE, DOB, GENDER, HEIGHT, WEIGHT, BMI) VALUES (? , ? , ? , ? , ? , ? , ?)'; 

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(401).send({ success: false });//Err: Unauthorized: Invalid access token.

        var BMI = (req.body.WEIGHT / ((req.body.HEIGHT) * (req.body.HEIGHT))); //Calculate BMI.

        try{
            DB.all(sqlCheck, [user.ACCOUNTID, req.body.PROFILE], (err, rows) => {
                if(err) return res.status(500).send({ success: false });//Err: Server Err.
                if(rows.length > 0) return res.status(409).send({ success: false });//Err: Conflict: Profile already exists.
                
                DB.run(sql, [user.ACCOUNTID, req.body.PROFILE, req.body.DOB, req.body.GENDER, req.body.HEIGHT, req.body.WEIGHT, BMI], (err) => {
                if(err) return res.status(500).send({ success: false });//Err: Server Err.
                return res.status(200).send({ success: true });//Success: Profile created.
                });
            });
        } catch(err){res.status(500).send({ success: false })}//Err: Server Err.
    });
})

app.post('/getProfiles', async (req, res) => {

    const accessToken = req.body.accessToken;

    //SQL CMD: Check if account has any profiles.
    const sql = 'SELECT * FROM USERSTATICDATA WHERE ACCOUNTID = ?';
    
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(401).send({ success: false });//Err: Unauthorized: Invalid access token.

        try{
            //SQL to DB: Check if email exists.
            DB.all(sql, [user.ACCOUNTID], async (err, rows)=>{
                if(err) return res.status(400).send({ success: false }); //Err: Bad Req.
                if(rows.length == 0) return res.status(404).send({ success: false }); //Err: Not Found: no profiles found for account.
                
                return res.status(200).send({ success: true, profiles: rows }); //Success: Profiles found.
            })
        }
        catch(err){res.status(500).send({ success: false })}//Err: Server Err.
    })
})