import { useNavigate } from "react-router-dom";

//Stores commonly used functions.

export function setAccessToken(token) {
    localStorage.setItem('accessToken', token);
}

export function getAccessToken() {
    return localStorage.getItem('accessToken');
}

export function clearAccessToken() {
    localStorage.removeItem('accessToken');
}

/** [ Helper Function ] 
 * Displays error message.
 * Requires: msg (string).
 * Looks for: id 'err' in the DOM.
*/
export function displayErr(msg) {
  var err = document.getElementById("err")
  err.textContent = msg;
  err.style.display = 'block';
};

/** [ Helper Function ]
 * Verifies access token validity.
 * Redirects to login page if token is invalid or not found.
 */
export async function verifyAccessToken() {

    const accessToken = getAccessToken();

    const API_VERIFY_TOKEN = 'http://localhost:3000/verifyToken';

    if(!accessToken){
        return false;
    }
    else{
        try{
            //Payload.
            const res = await fetch(API_VERIFY_TOKEN, {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({ accessToken }),
            });
            const result = await res.json();

            if (!result.success) {
                return false;
            }
            else return true;
        }
        catch(err){"Error: CreateProfileFirst: verifyAccessToken: ", err.message}
    }
}