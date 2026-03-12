//Stores commonly used functions for the backend. This is to avoid circular imports and to keep the code clean.

import jwt from 'jsonwebtoken';
import 'dotenv/config';

/** Generates an access token for the user.
 * Full Payload: ACCOUNTID, PROFILEID.
 * Half Payload: ACCOUNTID.
*/
export function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

export function verifyAccessToken(token) {
  if(!token) return { success: false };

  try{
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return { success: true, decoded };
  }
  catch(err) {return { success: false }};
}