
let addUserFormEl = document.getElementById("addUserForm");
let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");
let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");
let phoneEl = document.getElementById("phone");
let phoneErrMsgEl = document.getElementById("phoneErrMsg");
let passwordEl = document.getElementById("password");
let passwordErrMsgEl = document.getElementById("passwordErrMsg");
let confirmPasswordEl = document.getElementById("confirmPassword");
let confirmPasswordErrMsgEl = document.getElementById("confirmPasswordErrMsg");
let workingStatusEl = document.getElementById("status");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");
let successMessageEl = document.getElementById("successMessage");


let formData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    status: "Active",
    gender: "Male"
};


nameEl.addEventListener("blur", validateName);
emailEl.addEventListener("blur", validateEmail);
phoneEl.addEventListener("blur", validatePhone);
passwordEl.addEventListener("blur", validatePassword);
confirmPasswordEl.addEventListener("blur", validateConfirmPassword);

workingStatusEl.addEventListener("change", function(event) {
    formData.status = event.target.value;
});

genderMaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});

genderFemaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});

function validateName() {
    if (nameEl.value === "") {
        nameErrMsgEl.textContent = "*Required";
        return false;
    } else if (nameEl.value.length < 5) {
        nameErrMsgEl.textContent = "Name must not be less than 5 characters";
        return false;
    } else {
        nameErrMsgEl.textContent = "";
        formData.name = nameEl.value;
        return true;
    }
}

function validateEmail() {
    if (emailEl.value === "") {
        emailErrMsgEl.textContent = "*Required";
        return false;
    } else if (!emailEl.value.includes("@")) {
        emailErrMsgEl.textContent = "Enter valid Email address";
        return false;
    } else {
        emailErrMsgEl.textContent = "";
        formData.email = emailEl.value;
        return true;
    }
}

function validatePhone() {
    if (phoneEl.value === "") {
        phoneErrMsgEl.textContent = "*Required";
        return false;
    } else if (phoneEl.value.length !== 10 || isNaN(phoneEl.value)) {
        phoneErrMsgEl.textContent = "Enter valid 10 digit number";
        return false;
    } else {
        phoneErrMsgEl.textContent = "";
        formData.phone = phoneEl.value;
        return true;
    }
}

function validatePassword() {
    if (passwordEl.value === "") {
        passwordErrMsgEl.textContent = "*Required";
        return false;
    } else if (passwordEl.value.length < 8 || passwordEl.value === "password" || passwordEl.value === nameEl.value) {
        passwordErrMsgEl.textContent = "Password is not strong enough";
        return false;
    } else {
        passwordErrMsgEl.textContent = "";
        formData.password = passwordEl.value;
        return true;
    }
}

function validateConfirmPassword() {
    if (confirmPasswordEl.value === "") {
        confirmPasswordErrMsgEl.textContent = "*Required";
        return false;
    } else if (confirmPasswordEl.value !== passwordEl.value) {
        confirmPasswordErrMsgEl.textContent = "Password doesn't match";
        return false;
    } else {
        confirmPasswordErrMsgEl.textContent = "";
        formData.confirmPassword = confirmPasswordEl.value;
        return true;
    }
}


function submitFormData(formData) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 8dca63cbb4e27d3a2277ffcd0684905dddea6005ece260f2ae36bfe8130fbf33",
        },
        body: JSON.stringify(formData)
    };
    let url = "https://gorest.co.in/public-api/users";
    fetch(url, options)
        .then(response => response.json())
        .then(jsonData => {
            console.log(jsonData)
            if (jsonData.code === 422 && jsonData.data[0].message === "has already been taken") {
                emailErrMsgEl.textContent = "Email already exists";
            } else {
                showSuccessMessage();
            }
        });
}


function showSuccessMessage() {
    addUserFormEl.classList.add("d-none");
    successMessageEl.classList.remove("d-none");
}


addUserFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    let isFormValid = validateName() && validateEmail() && validatePhone() && validatePassword() && validateConfirmPassword();
    if (isFormValid) {
        submitFormData(formData);
    } else {
        alert('Please correct the errors in the form');
    }
});
