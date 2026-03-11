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
 * Checks if a value is a number.
*/
export function isNumber(n){
    return typeof(n) != "boolean" && !isNaN(n);
}