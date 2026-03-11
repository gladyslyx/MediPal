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

//Contains authentication API endpoints.

//>>SET UP>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Port number. Currently set to 3000, local host.
const portCode = 3000;

//Port listener. Logs message if successful.
app.listen(portCode, (err) => {
    if(err) console.log('Error: listen: DBAccessor: ', err.message);
    console.log('Listening on port: ', portCode);
})

//Connection test. Returns message if successful.
app.get('/', (req, res) =>{
    res.status(200).send('OK. Auth server is running...');
})

//>>FUNCTIONS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/** Generates an access token for the user.
 * Full Payload: ACCOUNTID, PROFILEID.
 * Half Payload: ACCOUNTID.
*/
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

//>>API ENDPOINTS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/** /register
 * Registers email and password to the database.
 * Requires: EMAIL, PASSWORD.
 * Success: Inserts email, hashed password and refresh token to database.
 * Success: Returns status code (200).
 * Failure: Returns success: false and a status code (400-500).
 */
app.post('/register', async (req, res) => {
    res.set('content-type', 'application/json');

    //>> Set up >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const EMAIL = req.body.EMAIL;
    const PASSWORD = req.body.PASSWORD;

    //SQL CMD: check if email already exists in database.
    const sqlCheck = 'SELECT * FROM USERLOGINTABLE WHERE EMAIL=?'; 

    //SQL CMD: Insert new email and password.
    const sqlInsert = 'INSERT INTO USERLOGINTABLE(EMAIL, PASSWORD) VALUES (? , ?)'; 

    //>> Execution >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    /**
     * Steps:
     * 1. Check if email already exists in database. If it does, return error.
     * 2. Hash password and insert email and hashed password into database.
     * 3. Return success message.
     */

    try{
        //1. Check if email already exists.
        DB.all(sqlCheck, [EMAIL], async (err, rows)=>{
            if(err) return res.status(400).send({ success: false });//Err: Bad Req.
            if (rows.length > 0) return res.status(409).send({ success: false });//Err: Conflict: Email already exists.
            
            //2. Hash password. Salt rounds: 10.
            const hashedPassword = await bcrypt.hash(PASSWORD, 10)

            //2. Insertion.
            DB.run(sqlInsert, [EMAIL, hashedPassword], function(err){
                if(err) return res.status(500).send({ success: false });//Err: Server Err.
                
                //3. Success.
                return res.status(200).send({ success: true });//Success: Registered. 
            })
        })        
    }
    catch(err){res.status(500).send({ success: false })}//Err: Server Err.
})

/** /login
 * Checks if email exists, and if password matches the email.
 * Requires: EMAIL, PASSWORD.
 * Success: Returns account ID and status code (200).
 * Failure: Returns success: false and a status code (400-500).
 */
app.post('/login', (req, res) => {
    res.set('content-type', 'application/json');

    //>> Set up >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const EMAIL = req.body.EMAIL;
    const PASSWORD = req.body.PASSWORD;

    //SQL CMD: Find user based on EMAIL.
    const sql = 'SELECT ACCOUNTID, PASSWORD FROM USERLOGINTABLE WHERE EMAIL=?'; 

    //SQL CMD: Find profiles.
    const sqlProfile = 'SELECT PROFILEID FROM USERSTATICDATA WHERE ACCOUNTID=?'; 

    //>> Execution >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    /**
     * Steps:
     * 1. Check if email exists in database. If it doesn't, return error.
     * 2. Compare hashed password with password from request.
     * 3. Get account ID.
     * 4a. Find first profile for account, and return full token.
     * 4b. If no profiles found, return half token with account ID only.
     */

    try{
        //1. SQL to DB: Check if email exists.
        DB.all(sql, [EMAIL], async (err, rows)=>{
            if(err) return res.status(400).send({ success: false }); //Err: Bad Req.

            //2. If email exists, compare password.
            if (rows.length > 0 && await bcrypt.compare(PASSWORD, rows[0].PASSWORD))
            {
                //3. Get account ID.
                const ACCOUNTID = rows[0].ACCOUNTID;

                //4a. SQL to DB: Find first profile for account.
                DB.all(sqlProfile, [ACCOUNTID], (err, rows)=>{
                    if(err) return res.status(400).send({ success: false }); //Err: Bad Req.
                    
                    if(rows.length > 0){
                        //4a. Profile found. Return full token with account ID and profile ID.
                        const PROFILEID = rows[0].PROFILEID;
                        const accessToken = generateAccessToken({ ACCOUNTID: ACCOUNTID, PROFILEID: PROFILEID });
                        return res.status(200).send({ success: true, accessToken , isHalf: false});//Success: Authorized.
                    }
                    else{
                        //4b. No profile found. Return half token with account ID only.
                        const accessToken = generateAccessToken({ ACCOUNTID: ACCOUNTID });
                        return res.status(200).send({ success: true, accessToken , isHalf: true });//Success: Authorized.
                    }
                })
            }
            else return res.status(401).send({ success: false });//Err: Unauthorized: Wrong email or password.
        })
    }
    catch(err){res.status(500).send({ success: false })}//Err: Server Err.
})

/** /generateTokens
 * Generates new access and refresh tokens for a user.
 * Requires: ACCOUNTID, PROFILEID.
 * Success: Returns tokens and success: true.
 * Failure: Returns success: false and a status code (400-500).
 */
app.post('/generateTokens', async (req, res) => {

    //Create access token and refresh token.
    const accessToken = generateAccessToken({ ACCOUNTID: req.body.ACCOUNTID, PROFILEID: req.body.PROFILEID });
    const REFRESHTOKEN = generateRefreshToken({ ACCOUNTID: req.body.ACCOUNTID, PROFILEID: req.body.PROFILEID });

    //SQL CMD: Update refresh token for user.
    const sqlRefreshToken = 'UPDATE USERLOGINTABLE SET REFRESHTOKEN=? WHERE ACCOUNTID=?';

    try{
    // Update the refresh token in the database
    DB.run(sqlRefreshToken, [REFRESHTOKEN, req.body.ACCOUNTID], (err) => {
        if (err) return res.status(500).send({ success: false });//Err: Server Err.
        return res.status(200).send({ success: true, accessToken, REFRESHTOKEN });//Success: Authorized.
        })
    }
    catch(err){res.status(500).send({ success: false })}//Err: Server Err.
});


/** /refresh
 * Verifies refresh token, and if valid, generates new access token.
 * Should be called when access token expires, and client has a valid refresh token.
 * Requires: REFRESHTOKEN.
 * Success: Returns access token, success: true and status code (200).
 * Failure: Returns success: false and a status code (400-500).
 */
app.post('/refresh', (req, res) => {
    res.set('content-type', 'application/json');

    const REFRESHTOKEN = req.body.REFRESHTOKEN;
    
    //SQL CMD: Check if refresh token exists in database.
    const sql = 'SELECT * FROM USERLOGINTABLE WHERE REFRESHTOKEN=?'; 

    //Check if refresh token is null.
    if (REFRESHTOKEN == null) return res.status(401).send({ success: false });//Err: Unauthorized: No token.

    try{
        //SQL to DB: Check if refresh token exists in database.
        DB.all(sql, [REFRESHTOKEN], (err, rows)=>{
            if(err) return res.status(400).send({ success: false });//Err: Bad Req.

            if (rows.length > 0)
                //Verify refresh token.
                jwt.verify(REFRESHTOKEN, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) return res.status(403).send({ success: false });//Err: Forbidden: Invalid token.
                    
                    //Generate new access token.
                    const accessToken = generateAccessToken({ ACCOUNTID: user.ACCOUNTID });
                    return res.status(200).send({ success: true, accessToken });//Success: Authorized. 
                })
            else return res.status(403).send({ success: false });//Err: Forbidden: Token not found in database.
        })
    }
    catch(err){res.status(500).send({ success: false })}//Err: Server Err.
})

/** /logout
 * Removes refresh token from the database.
 * Success: Removes refresh token from database.
 * Success: Returns success: true and status code (200).
 * Failure: Returns success: false and a status code (400-500).
 */
app.post('/logout', (req, res) => {
    res.set('content-type', 'application/json');  

    const REFRESHTOKEN = req.body.REFRESHTOKEN;
    if (REFRESHTOKEN == null) return res.status(400).send({ success: false });//Err: Bad Req: No token.
 
    //SQL CMD: Remove refresh token from database.
    const sql = 'UPDATE USERLOGINTABLE SET REFRESHTOKEN=NULL WHERE REFRESHTOKEN=?';

    try{
        //SQL to DB: Remove refresh token from database.
        DB.run(sql, [REFRESHTOKEN], function(err){
            if(err) return res.status(500).send({ success: false });//Err: Server Err.
            
            //Detect if a row was updated (i.e. if the token was found and removed).
            if(this.changes == 1) return res.status(200).send({ success: true });//Success: Logged out.
            else return res.status(400).send({ success: false });//Err: Bad Req: Token not found.
        })
    }
    catch(err){res.status(500).send({ success: false })}//Err: Server Err.
})

{/*
//<<<<<<Get>>>>>> : Request data from table.    
app.get('/get', (req, res) => {
    res.set('content-type', 'application/json');

    //SQL: Find user based on EMAIL and PASSWORD.
    const sql = 'SELECT * FROM USERLOGINTABLE WHERE EMAIL=? AND PASSWORD=?'; 
    let data = {user: []}

    try{
        //SQL to DB: Push valid rows to array.
        DB.all(sql, [req.query.EMAIL, req.query.PASSWORD], (err, rows)=>{
            if(err) throw err;
            rows.forEach((row)=>{
                data.user.push({id: row.ID, email: row.EMAIL, password: row.PASSWORD})
            });

            //Data to JSON. Output JSON.
            let content = JSON.stringify(data);
            res.send(content);
        })
    }
    catch(err){console.log('Error: get: DBAccessor: ', err.message)}
})

//<<<<<<Post>>>>>> : Add data to the table.
app.post('/update', (req, res) => {
    res.set('content-type', 'application/json');
    console.log(req.body);

    //SQL: Insert new email and password.
    const sql = 'INSERT INTO USERLOGINTABLE(EMAIL, PASSWORD) VALUES (? , ?)'; 

    try{
        //SQL to DB: Request EMAIL and PASSWORD.
        DB.run(sql, [req.body.EMAIL, req.body.PASSWORD], function(err){
            if(err) throw err;

            //Response to JSON. Output JSON.
            let data = {message: 'Post successful.'};
            let content = JSON.stringify(data);
            res.send(content);
        })
    }
    catch(err){console.log('Error: post: DBAccessor: ', err.message)}
})

//<<<<<<Delete>>>>>> : Removing item from table.
app.delete('/del', (req, res) => {
res.set('content-type', 'application/json');

//SQL: Remove based on ID.
const sql = 'DELETE FROM USERLOGINTABLE WHERE ID=?';

    try{
        //SQL to DB: Request ID, run SQL.
        DB.run(sql, [req.query.ID], function(err){
            if(err) throw err;

            //
            if(this.changes == 1){
                res.send('{"message":"Item deleted."}')
            }else{
                res.send('{"message":"Nothing deleted."}')
            }
        })
    }
    catch(err){console.log('Error: post: DBAccessor: ', err.message)}
})

*/}