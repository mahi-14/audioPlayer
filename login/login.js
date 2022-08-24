var credentials = {
  name: "mahi",
  password: "1234",
};
const signIn = () => {
  var uname = document.getElementById("username");
  var pass = document.getElementById("password");
  var err = document.getElementById("error");
  if (uname.value == credentials.name && pass.value == credentials.password) {
    err.innerText = "correct data";
    err.style.display = "block";
    err.style.color = "lightGreen";
    window.location.href = "../index.html";
  } else {
    window.alert("Please enter correct credentials");
  }
};
