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
export function generateAccessToken(user) {
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

/** /verifyToken
 * Verifies the authenticity of the access token.
 * Requires: accessToken.
 * Success: Returns success: true and a status code (200).
 * Failure: Returns success: false and a status code (401-500).
 */
app.post('/verifyToken', (req, res) => {
    res.set('content-type', 'application/json');
    const accessToken = req.body.accessToken;

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if(err) return res.status(401).send({ success: false });//Err: Unauthorized: Invalid access token.
        return res.status(200).send({ success: true });//Success: Authorized.
    });
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