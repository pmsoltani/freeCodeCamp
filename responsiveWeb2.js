// -----------------------------------
// getting DOM objects
const body = document.body;
const fullName = document.getElementById('name');
const age = document.getElementById('age');
const email = document.getElementById('email');
const password = document.getElementById('password');
const togglePass = document.getElementById('togglePass');
const submit = document.querySelector('#submit input[type="submit"]');
const forms = document.getElementsByTagName('form');

// -----------------------------------
// definitions
const validClass = '<i class="fas fa-check-circle"></i>';
const invalidClass = '<i class="fas fa-times-circle"></i>';

// form validation
function validation (field, error) {
    let spanIconRight = field.parentElement.querySelector('span.icon-right');
    let spanMessageBox = field.parentElement.parentElement.querySelector('span.message-box');
    // let spanIconRight = field.nextElementSibling;
    if (!error) {
        spanIconRight.innerHTML = validClass;
        spanIconRight.classList.remove('invalid');
        spanIconRight.classList.add('valid');
        spanMessageBox.textContent = '';
        spanMessageBox.classList.remove('invalid')
    } else {
        console.log(error);
        spanIconRight.innerHTML = invalidClass;
        spanIconRight.classList.remove('valid');
        spanIconRight.classList.add('invalid');
        spanMessageBox.textContent = error;
        spanMessageBox.classList.add('invalid')
    }
}

let hasError = function (field) {
    // Don't validate submits, buttons, file & reset inputs, and disabled fields
    if (
        field.disabled || 
        field.type === 'file' || 
        field.type === 'reset' || 
        field.type === 'submit' || 
        field.type === 'button'
    ) return;

    // Get validity
    let validity = field.validity;

    // If valid, return null
    if (validity.valid) return;

    // If field is required and empty
    if (validity.valueMissing) return 'Please fill out this field.';
    // If not the right type
    if (validity.typeMismatch) {
        // Email
        if (field.type === 'email') return 'Please enter an email address.';
        // URL
        if (field.type === 'url') return 'Please enter a URL.';
    }
    // If too short
    if (validity.tooShort) {
        return `${field} should be at least ${field.getAttribute('minLength')} characters.`;
    }
    // If too long
    if (validity.tooLong) {
        return `${field} should be at most ${field.getAttribute('maxLength')} characters.`;
    }
    // If number input isn't a number
    if (validity.badInput) return 'Please enter a number.';
    // If a number value doesn't match the step interval
    if (validity.stepMismatch) return 'Please select a valid value.';
    // If a number field is over the max
    if (validity.rangeOverflow) {
        return `Maximum ${field} should be ${field.getAttribute('max')}.`;
    }
    // If a number field is below the min
    if (validity.rangeUnderflow) {
        return `Minimum ${field} should be ${field.getAttribute('min')}.`;
    }
    // If pattern doesn't match
    if (validity.patternMismatch) return 'Please match the requested format.';
    // If all else fails, return a generic catchall error
    return 'The value you entered for this field is invalid.';
};

// -----------------------------------
// validations happen here
for (let i = 0; i < forms.length; i++) {
    forms[i].setAttribute('novalidate', true);
}

document.addEventListener('blur', function (event) {
    // validation (event.target, 'J S');
    let error = hasError(event.target);
    validation (event.target, error);
    // if (error) {
    //     event.target.classList.add('error');
    // }
}, true);

// fullName.addEventListener('blur', () => {
//     validation (fullName, 'J S');
// });
// age.addEventListener('blur', () => {
//     validation (age, 'J S');
// });
// email.addEventListener('blur', () => {
//     validation (email, 'J S');
// });
// password.addEventListener('blur', () => {
//     validation (password, 'J S');
// });

// -----------------------------------
// toggling password visibility
togglePass.addEventListener('mousedown', (event) => {
    event.preventDefault();
    password.focus();
    password.type = 'text';
    togglePass.innerHTML = '<i class="far fa-eye fa-flip-horizontal">';
    
    togglePass.addEventListener('mouseleave', () => {
        password.type = 'password';
        togglePass.innerHTML = '<i class="far fa-eye-slash">';
    });
    togglePass.addEventListener('mouseup', () => {
        password.type = 'password';
        togglePass.innerHTML = '<i class="far fa-eye-slash">';
    });
});

togglePass.addEventListener('click', (event) => {
    event.preventDefault();
    password.focus();
});

// custom styles for the 'show password' button (eye)
password.addEventListener('focus', () => togglePass.style.color = '#268BFE');
password.addEventListener('focusout', () => togglePass.style.color = '#747574');

// -----------------------------------