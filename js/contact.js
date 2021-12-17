const formName = document.querySelector("#name");
const formNameError = document.querySelector("#nameError");
const formEmail = document.querySelector("#email");
const formEmailError = document.querySelector("#emailError");
const formSubject = document.querySelector("#subject");
const formSubjectError = document.querySelector("#subjectError");
const formMessage = document.querySelector("#message");
const formMessageError = document.querySelector("#messageError");
const contactForm = document.querySelector("form");
const sendButton = document.querySelector(".send_button");
const paperPlane = document.querySelector(".fa-paper-plane");

function validateForm(event) {

    event.preventDefault();

    if(checkLength(formName.value, 5) === true) {
        formNameError.style.display = "none";
    } 
    else {
        formNameError.style.display = "block";
    }
    
    if(validateEmail(formEmail.value) === true) {
        formEmailError.style.display = "none";
    } 
    else {
        formEmailError.style.display = "block";
    } 

    if(checkLength(formSubject.value, 15) === true) {
        formSubjectError.style.display = "none";
    } 
    else {
        formSubjectError.style.display = "block";
    }

    if(checkLength(formMessage.value, 25) === true) {
        formMessageError.style.display = "none";
    } 
    else {
        formMessageError.style.display = "block";
    }
}

function confirmSending() {
    if (checkLength(formName.value, 5) && validateEmail(formEmail.value) && checkLength(formSubject.value, 15) && checkLength(formMessage.value, 25)) {
        
        contactForm.reset();
        
        sendButton.value = "Sent!";
        sendButton.style.background = "#94bf69";
        sendButton.style.padding = "10px 5px";
        paperPlane.style.display = "none";
    } 
}


contactForm.addEventListener("submit", validateForm);
contactForm.addEventListener("submit", confirmSending);


function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}