//  signIn
var signInEmail = document.getElementById('signInEmail');
var signInPassword = document.getElementById('signInPassword');
var btnLogin = document.getElementById('btnLogin');
var incorrect = document.getElementById('incorrect');

// signUp
var userName = document.getElementById('userName');
var userEmail = document.getElementById('userEmail');
var userPassword = document.getElementById('userPassword');
var btnSignUp = document.getElementById('btnSignUp');
var isValid = document.getElementById('isValid');
var notValid = document.getElementById('notValid');
var isExist = document.getElementById('isExist')
var arrList;

// Home
var userNameSession = localStorage.getItem('userNameSession');



if (localStorage.getItem('arrList')) {
    arrList = JSON.parse(localStorage.getItem('arrList'));

} else {
    arrList = [];


}
// Add New Users
function add() {
    var users = {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value
    }

    if (checkDataSignUp() == true && exist() == false) {
        arrList.push(users)
        localStorage.setItem('arrList', JSON.stringify(arrList))
        isValid.classList.remove('d-none')
        console.table(arrList);
        resetInputs()
    } else {
        notValid.classList.remove('d-none')
    }
}

// Reset Inouts sign Up
function resetInputs() {
    userName.value = '';
    userPassword.value = '';
    userEmail.value = '';
    userEmail.classList.remove("is-valid");
    userName.classList.remove("is-valid");
    userPassword.classList.remove("is-valid");

}

//  validation inputs in signup
// Name
function validateUserName() {
    var userNameRejex = /^[A-Z][a-z A-z 0-9]{2,}$/;
    var resultNameRejex = userNameRejex.test(userName.value);

    if (resultNameRejex == true && userName.value != "") {
        userName.classList.replace("is-invalid", "is-valid");
        document.getElementById('invalidUserName').classList.add('d-none');
        return true;

    } else {
        userName.classList.add("is-invalid");
        document.getElementById('invalidUserName').classList.remove('d-none');
        return false;
    }
}
// Email
function validateEmail() {
    var emailRejex = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;
    var resultEmailRejex = emailRejex.test(userEmail.value);
    if (resultEmailRejex == true && userEmail.value != '') {
        userEmail.classList.replace("is-invalid", "is-valid");
        document.getElementById('invalidUserEmail').classList.add('d-none');
        return true

    } else {
        userEmail.classList.add("is-invalid");
        document.getElementById('invalidUserEmail').classList.remove('d-none');
        return false;
    }
}
// Passowrd
function validatePassword() {
    var passRejex = /^([a-z 0-9]).{5,15}$/;
    var resultPass = passRejex.test(userPassword.value);
    if (resultPass == true && userPassword.value != '') {
        userPassword.classList.replace("is-invalid", "is-valid");
        document.getElementById('invalidUserPassword').classList.add("d-none")
        return true;
    } else {
        userPassword.classList.add("is-invalid")
        document.getElementById('invalidUserPassword').classList.remove("d-none");
        return false;
    }

}
// Check data sign up
function checkDataSignUp() {
    validateUserName();
    validatePassword();
    validateEmail();
    if (validateUserName() == true &&
        validateEmail() == true &&
        validatePassword() == true) {
        return true;
    }
    else {
        return false
    }
}
// User Is Exist
function exist() {
    for (let i = 0; i < arrList.length; i++) {
        if (arrList[i].email == userEmail.value) {
            isExist.classList.remove('d-none');
            userEmail.value = '';

            return true;
        }
    }
    return false;
}
// events in sign Up
userName.addEventListener('keyup', function () {
    isValid.classList.add('d-none');
    notValid.classList.add('d-none');
    validateUserName()


})
userEmail.addEventListener('keyup', function () {
    isExist.classList.add('d-none');
    notValid.classList.add('d-none');
    validateEmail()

})
userPassword.addEventListener('keyup', function () {
    validatePassword()

})
// Btn Sign Up
btnSignUp.addEventListener('click', add);

// =======>  Login  <=========//

function login() {
    if (signInEmail.value == '' || signInPassword.value == '') {
        document.getElementById('incorrect').classList.remove('d-none');
        return false;
    }

    for (var i = 0; i < arrList.length; i++) {
        if (arrList[i].email == signInEmail.value &&
            arrList[i].password == signInPassword.value) {
            localStorage.setItem('userNameSession', arrList[i].name);
            btnLogin.setAttribute("href", "home.html");
        } else {
            incorrect.classList.remove('d-none');
        }
    }

}

console.log(userNameSession);

function display() {

    document.getElementById('username').innerHTML = "Welcome" + userNameSession;
}

function logOut() {
    localStorage.removeItem("userNameSession")
    
}