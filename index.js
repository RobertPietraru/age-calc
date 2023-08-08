const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const button = document.querySelector("button");

const Inputs = {
    day: "day",
    month: "month",
    year: "year",
};

class InputError {
    constructor(message, type) {
        this.message = message;
        this.type = type;
    }
}

function checkForErrors(text, type) {

    if (text === "") { return new InputError("Field cannot be empty", type) };
    if (isNaN(parseInt(text))) return new InputError("You can only use numbers", type)

    if (type === Inputs.day) {
        let day = parseInt(text);
        if (day < 1 || day > 31) {
            return new InputError("The day can only be between 1 and 31", Inputs.day);
        }
    }
    if (type === Inputs.month) {
        let month = parseInt(text);
        if (month < 1 || month > 12) {
            return new InputError("The month can only be between 1 and 12", Inputs.month);
        }
    }
    if (type == Inputs.year) {
        let year = parseInt(text);
        let currentDate = new Date();

        if (currentDate.getFullYear() < year) {
            return new InputError("The year cannot be from the future", Inputs.year);
        }
    }

    return null;


}

function addError(errorMessage, errorType) {
    let elements = document.querySelectorAll(`*[for="${errorType}"]`)
    elements.forEach(element => {
        console.log(element)
        element.classList.add("error");
    })
    elements[1].innerHTML = errorMessage;
}

button.addEventListener("click", function () {
    var errors = [checkForErrors(dayInput.value, Inputs.day), checkForErrors(monthInput.value, Inputs.month), checkForErrors(yearInput.value, Inputs.year),];

    var hasError = false;
    errors.forEach(error => {
        if (error == null) return;
        hasError = true;
        console.log(error.type, error.message)
        let elements = document.querySelectorAll(`*[for="${error.type}"]`)
        elements.forEach(element => {
            console.log(element)
            element.classList.add("error");
        })
        elements[1].innerHTML = error.message;
    });

    if (hasError) return;

    var possibleDate = new Date(parseInt(yearInput.value), parseInt(monthInput.value - 1), parseInt(dayInput.value));

    if (possibleDate.getDate() != dayInput.value ||
        possibleDate.getMonth() + 1 != monthInput.value ||
        possibleDate.getFullYear() != yearInput.value
    ) {
        addError("The date ", Inputs.day);
        addError("is invalid. Please", Inputs.month);
        addError("check again!", Inputs.year);
        return;
    }
    var diffInMiliseconds = new Date() - possibleDate;
    if (diffInMiliseconds < 0) {
        addError("The date ", Inputs.day);
        addError("is in the future.", Inputs.month);
        addError("Please check again!", Inputs.year);
        return;

    }
    var diffInHours = diffInMiliseconds / 1000 / 60 / 60 ;
    var diffDays = ~~(diffInHours / 24);

    var years = ~~(diffDays / 365.25)
    var daysLeft = diffDays % 365.25;
    var months = ~~(daysLeft / 30);
    var days = ~~(daysLeft % 30);
    document.querySelector("#years").innerHTML = years;
    document.querySelector("#months").innerHTML = months;
    document.querySelector("#days").innerHTML = days;
});

function clearAllErrors() {
    var elements = document.querySelectorAll("label.error");
    elements.forEach(element => {
        element.classList.remove('error');
    })
    elements = document.querySelectorAll("p.error");
    elements.forEach(element => {
        element.classList.remove('error');
        element.innerHTML = "";
    })

}

dayInput.addEventListener("input", function (e) {
    clearAllErrors();
})

monthInput.addEventListener("input", function (e) {
    clearAllErrors();
})

yearInput.addEventListener("input", function (e) {
    clearAllErrors();
})
