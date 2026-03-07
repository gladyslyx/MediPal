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

DB EMAILS have unique constraint.

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<THANK_YOU>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

Thank you to this guy! For db server setup and db api.
https://youtu.be/_RtpUaBSie0

Thank you to this guy! For password hashing.
https://youtu.be/Ud5xKCYQTjM

Thank you to my teammates! For going through all this together!

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<MY_INPUTS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

I suggest you use the tabs on the left to close functions.
Makes it easier to read the code.

Right now, the comments are a mess, but I'll clean it up, frfr.

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
 * Returns 1 if successful, 0 if unsuccessful.
 * Returns relevant status codes.

 /login
 * Checks if email exists, and if password matches the email.
 * Returns 1 if successful, 0 if unsuccessful.
 * Returns relevant status codes.

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