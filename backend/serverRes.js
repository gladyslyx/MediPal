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

//>>API ENDPOINTS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.post('/createProfile', async (req, res) => {

    const accessToken = req.body.accessToken;

    //SQL CMD: Insert new profile.
    const sql = 'INSERT INTO USERSTATICDATA(ID, PROFILE, DOB, AGE, GENDER, HEIGHT, WEIGHT, BMI) VALUES (? , ? , ? , ? , ? , ? , ? , ?)'; 

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(401).send({ success: false });//Err: Unauthorized: Invalid access token.

        

        try{
            DB.run(sql, [user.ID, req.body.DOB, null, null, null, null, null, null], (err) => {
                if(err) return res.status(500).send({ success: false });//Err: Server Err.
                return res.status(200).send({ success: true });//Success: Profile created.
            });
        } catch(err){res.status(500).send({ success: false })}//Err: Server Err.
    })

})