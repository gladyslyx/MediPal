<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<TO_DO>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Create column for refresh token in user login table.
Access tokens will expire with time. Will be stored as local variables using exported functions.
Refresh tokens will be held in database for server side and httponly cookie for client side

Modify /login API to pass access token and refresh token to user.
Modify /register API to pass access token and refresh token to user.

Add /logout API to remove refresh token
Note: Removal of access token should be done locally on frontend. I.e.: accessToken = null.

Add /verifyToken API to verify validity of access token.

Add /getNewAccessToken API to obtain new access tokens periodically before expiry.
This API should verify the refresh token.

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<WARNING>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

Do NOT touch package.json.
Do NOT touch package-lock.json.

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<THANK_YOU>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

Thank you to this guy! For db server setup and db api.
https://youtu.be/_RtpUaBSie0

Thank you to this guy! For password hashing.
https://youtu.be/Ud5xKCYQTjM

Thank you to this guy! For JWT implementation and authentication.
https://youtu.be/mbsmsi7l3r4

Thank you to my teammates! For going through all this together!

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<MY_INPUTS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

I suggest you use the tabs on the left to close functions.
Makes it easier to read the code.

Right now, the comments are a mess, but I'll clean it as I go along.

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<EXECUTION>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

Note: Ensure your terminal is at '\Medipal\backend'

To run Authentication Server:
CMD: npm run authServer
PORT: http://localhost:3000

To run Resources Server:
CMD: npm run resServer
PORT: http://localhost:4000

To run both servers on the same terminal:
CMD: npm run dev

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<API>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/register
 * Registers email and password to the database.
 * Success: Inserts email, hashed password and refresh token to database.
 * Success: Returns access token, refresh token, success: true and status code (200).
 * Failure: Returns success: false and a status code (400-500).

 /login
 * Checks if email exists, and if password matches the email.
 * Success: Returns access token, refresh token, success: true and status code (200).
 * Failure: Returns success: false and a status code (400-500).

 /refresh
 * Verifies refresh token, and if valid, generates new access token.
 * Should be called when access token expires, and client has a valid refresh token.
 * Success: Returns access token, success: true and status code (200).
 * Failure: Returns success: false and a status code (400-500).

 /logout
 * Removes refresh token from the database.
 * Success: Removes refresh token from database.
 * Success: Returns success: true and status code (200).
 * Failure: Returns success: false and a status code (400-500).

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DATABASE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

TABLE: USERLOGINTABLE
* DESC: Keeps user login and session data.

* COLUMNS:
    1. ID : INT 
        * CONSTRAINT: PRIMARY KEY : AUTOINCREMENT : UNIQUE
        * DESC: Unique account identifier.
    2. EMAIL : INT
        * CONSTRAINT: UNIQUE
        * DESC: Unique account email.
    3. PASSWORD : TEXT 
        * DESC: Encrypted account password.
    4. REFRESHTOKEN : TEXT 
        * DESC: Account session validity.

TABLE: USERSTATICDATA
* DESC: Keeps static user data.

* COLUMNS:
    1. ID : INT
        * CONSTRAINT: PRIMARY KEY : FOREIGN KEY
    2. PROFILE : TEXT 
        * DESC: Profile identifier under an account.
    3. DOB : TEXT
        * DESC: Profile date of birth. ISO-8601 standard, YYYY-MM-DD.
    4. GENDER : TEXT 
    5. HEIGHT : NUMERIC
        * UNIT: Metres, m.
    6. WEIGHT : NUMERIC 
        * UNIT: Kilograms, kg.
    7. BMI : NUMERIC
        * CALCULATION: (weight / height^2). 
        * DESC: Profile BMI for given weight and height.

TABLE: USERTIMEDDATA
DESC: Keeps continuous data. Largely read from external devices.

COLUMNS:
1. ID : INT
    * CONSTRAINT: PRIMARY KEY : FOREIGN KEY
2. PROFILE : TEXT
3. DATE : TEXT
    * DESC: Date of entry. Follows ISO-8601 standard, YYYY-MM-DD.
4. TIME: TEXT 
    * DESC: Time of entry. Follows ISO-8601 standard, HH:MM:SS.
5. STEPS : INT
6. HEARTRATE : NUMERIC
7. SLEEPTIME : INT
8. CALORIESBURNT : NUMERIC
9. BLOODOXYGEN : NUMERIC
10. STRESSLVL : INT


<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<TOOLS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

POSTMAN - Used to test DB endpoint APIs.
Rest Client Extension - Used to test DB endpoint APIs.

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<GLOSSARY>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

DB - Database
err - Error
req - Request
res - Response

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<PACKAGES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

To create package.json (i.e: Become executable):
CMD: npm init -y

Sqlite package:
CMD: npm install sqlite3
DESC: For database handling.

Express package:
CMD: npm install express
DESC: Node JS backend framework.  

Body-Parser package:
CMD: npm install body-parser
DESC: Parsing of JSON.

cors package:
CMD: npm install cors
DESC: For cors policy.

JWT package:
CMD: npm install jsonwebtoken
DESC: To create access tokens.

bcrypt package:
CMD: npm install bcrypt
DESC: Encryption.

dotenv package:
CMD: npm install dotenv
DESC: To read .env file.

nodemon package: (Dev Dependency)
CMD: npm install --save-dev nodemon
DESC: Auto updates upon saving program.

concurrently package: (Dev Dependency)
CMD: npm i concurrently --save-dev
DESC: Runs multiple scripts at the same time.

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<OTHERS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

Creating a random code:
require('crypto').randomBytes(16).toString('hex')