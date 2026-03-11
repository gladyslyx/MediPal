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

/** Generates an access token for the user 
 * Expiry time: 10 minutes.
 * Should be stored in memory on the client side.
*/
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}

/** Generates a refresh token for the user 
 * No expiry time.
 * Should be stored in an httpOnly cookie on the client side, and also stored in the database for verification.
*/
function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

//>>API ENDPOINTS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/** /register
 * Registers email and password to the database.
 * Success: Inserts email, hashed password and refresh token to database.
 * Success: Returns access token, refresh token, success: true and status code (200).
 * Failure: Returns success: false and a status code (400-500).
 */
app.post('/register', async (req, res) => {
    res.set('content-type', 'application/json');

    //SQL CMD: check if email already exists in database.
    const sqlCheck = 'SELECT ACCOUNTID FROM USERLOGINTABLE WHERE EMAIL=?'; 

    //SQL CMD: Insert new email and password.
    const sqlInsert = 'INSERT INTO USERLOGINTABLE(EMAIL, PASSWORD) VALUES (? , ?)'; 

    try{
        //SQL to DB: Check if email already exists.
        DB.all(sqlCheck, [req.body.EMAIL], async (err, rows)=>{
            if(err) return res.status(400).send({ success: false });//Err: Bad Req.
            if (rows.length > 0) return res.status(409).send({ success: false });//Err: Conflict: Email already exists.
            
            //Hash password. Salt rounds: 10.
            const hashedPassword = await bcrypt.hash(req.body.PASSWORD, 10)

            //Insertion.
            DB.run(sqlInsert, [req.body.EMAIL, hashedPassword], function(err){
                if(err) return res.status(500).send({ success: false });//Err: Server Err.
            
                //Get ID.
                DB.all(sqlCheck, [req.body.EMAIL], async (err, rows)=>{
                    if(err) return res.status(500).send({ success: false });//Err: Server Err.
                    
                    //Create access token and refresh token.
                    const accessToken = generateAccessToken({ ACCOUNTID: rows[0].ACCOUNTID });
                    const REFRESHTOKEN = generateRefreshToken({ ACCOUNTID: rows[0].ACCOUNTID });

                    //SQL CMD: Update refresh token for user.
                    const sqlRefreshToken = 'UPDATE USERLOGINTABLE SET REFRESHTOKEN=? WHERE ACCOUNTID=?';

                    // Update the refresh token in the database
                    DB.run(sqlRefreshToken, [REFRESHTOKEN, rows[0].ACCOUNTID], (err) => {
                        if (err) return res.status(500).send({ success: false });//Err: Server Err.
                        return res.status(200).send({ success: true, accessToken, REFRESHTOKEN });//Success: Authorized.
                    });  
                })
            })
        })        
    }
    catch(err){res.status(500).send({ success: false })}//Err: Server Err.
})

/** /login
 * Checks if email exists, and if password matches the email.
 * Success: Returns access token, refresh token, success: true and status code (200).
 * Failure: Returns success: false and a status code (400-500).
 */
app.post('/login', (req, res) => {
    res.set('content-type', 'application/json');

    //SQL CMD: Find user based on EMAIL.
    const sql = 'SELECT ACCOUNTID, PASSWORD FROM USERLOGINTABLE WHERE EMAIL=?'; 

    try{
        //SQL to DB: Check if email exists.
        DB.all(sql, [req.body.EMAIL], async (err, rows)=>{
            if(err) return res.status(400).send({ success: false }); //Err: Bad Req.

            //If email exists, compare password.
            if (rows.length > 0 && await bcrypt.compare(req.body.PASSWORD, rows[0].PASSWORD))
            {
                //Create access token and refresh token.
                const accessToken = generateAccessToken({ ACCOUNTID: rows[0].ACCOUNTID });
                const REFRESHTOKEN = generateRefreshToken({ ACCOUNTID: rows[0].ACCOUNTID });

                //SQL CMD: Update refresh token for user.
                const sqlRefreshToken = 'UPDATE USERLOGINTABLE SET REFRESHTOKEN=? WHERE ACCOUNTID=?';

                // Update the refresh token in the database
                DB.run(sqlRefreshToken, [REFRESHTOKEN, rows[0].ACCOUNTID], (err) => {
                    if (err) return res.status(500).send({ success: false });//Err: Server Err.
                    return res.status(200).send({ success: true, accessToken, REFRESHTOKEN });//Success: Authorized.
                });
            }
            else return res.status(401).send({ success: false });//Err: Unauthorized: Wrong email or password.
        })
    }
    catch(err){res.status(500).send({ success: false })}//Err: Server Err.
})

/** /refresh
 * Verifies refresh token, and if valid, generates new access token.
 * Should be called when access token expires, and client has a valid refresh token.
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