export function handleSubmit(e) {
e.preventDefault();

const formData = new FormData(e.target);
const data = Object.fromEntries(formData.entries());

console.log("Login Data:", data);

alert("Login submitted (frontend only)");
}

export function handleTabSwitch(tab) {
console.log("Switched to:", tab);

}