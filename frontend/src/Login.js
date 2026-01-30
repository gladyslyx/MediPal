//Handle submit: handles login form submit.
//DOES NOT WORK

export function loginForm() {
    const handleSubmit = (event) =>
        //Prevents site from refreshing upon update.
        event.preventDefault();

        //Create form element/payload.
        const formData = new FormData(event.target);

        //Retrieve data from payload.
        const email = formData.get('email');
        const password = formData.get('password');
        console.log(email);
        console.log(password);
}


//Handle tab switch: handles page web page switching? Incomplete.
export function handleTabSwitch(tab) {
console.log("Switched to:", tab);

}