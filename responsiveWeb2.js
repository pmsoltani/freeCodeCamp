// -----------------------------------
// getting DOM objects
const body = document.body;
const name = document.getElementById('name');
const age = document.getElementById('age');
const email = document.getElementById('email');
const password = document.getElementById('password');
const togglePass = document.getElementById('togglePass');
const submit = document.querySelector('#submit input[type="submit"]');
const forms = document.getElementsByTagName('form');
const degree = document.getElementsByName('degree');
const major = document.getElementById('dropdown');

// -----------------------------------
// definitions
const majors = [
    ['Chemistry','Statisticss','Economics','Engineering','Finance'],
    ['Accounting','Finance','MBA','Statistics ','Economics'],
    ['Psychology','Biology','Statistics','Finance','Mathematics']
]
const validClass = '<i class="fas fa-check-circle"></i>';
const invalidClass = '<i class="fas fa-times-circle"></i>';
const patterns = {
    name: {
        pattern: /^([^0-9]*)$/,
        message: 'Numbers in name!'
    },
    email: {
        pattern: /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i,
        message: 'Invalid Email'
    },
    password: {
        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/,
        message: 'Min length 6. 1 upper, 1 lower, 1 number'
    }
};

// Form validation
// Constraint Validation API
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
    if (validity.valueMissing) return 'Required';
    // If not the right type
    if (validity.typeMismatch) {
        // Email
        if (field.type === 'email') return 'Invalid Email';
        // URL
        if (field.type === 'url') return 'Invalid URL';
    }
    // If too short
    if (validity.tooShort) {
        return `Min ${field.getAttribute('minLength')} characters`;
    }
    // If too long
    if (validity.tooLong) {
        return `Max ${field.getAttribute('maxLength')} characters`;
    }
    // If number input isn't a number
    if (validity.badInput) return 'Invalid Number';
    // If a number value doesn't match the step interval
    if (validity.stepMismatch) return 'Invalid Value';
    // If a number field is over the max
    if (validity.rangeOverflow) {
        return `Max is ${field.getAttribute('max')}`;
    }
    // If a number field is below the min
    if (validity.rangeUnderflow) {
        return `Min is ${field.getAttribute('min')}`;
    }
    // If pattern doesn't match
    if (validity.patternMismatch) return 'Invalid Format';
    // If all else fails, return a generic catchall error
    return 'Bad value for ${field.name}';
};

// Custom validation
let hasCustomError = function (field) {
    if (patterns.hasOwnProperty(field.name)) {
        if (!patterns[field.name].pattern.test(field.value)) {
            return patterns[field.name].message;
        }
    }
    return;
};

function validation (field, error, customError) {
    let iconRight = field.parentElement.querySelector('span.icon-right');
    let messageBox = field.parentElement.parentElement.querySelector('span.message-box');
    if (!error && !customError) {
        iconRight.innerHTML = validClass;
        iconRight.classList.remove('invalid');
        iconRight.classList.add('valid');
        messageBox.textContent = '';
        messageBox.classList.remove('invalid');
    }
    if (error || customError) {
        iconRight.innerHTML = invalidClass;
        iconRight.classList.remove('valid');
        iconRight.classList.add('invalid');
        messageBox.textContent = error || customError;
        messageBox.classList.add('invalid');
    }
}

// -----------------------------------
// validations happen here
// for (let i = 0; i < forms.length; i++) {
//     forms[i].setAttribute('novalidate', true);
// }

document.addEventListener('blur', function (event) {
    if (event.target.nodeName == 'INPUT') {
        let error = hasError(event.target);
        let customError = hasCustomError(event.target);
        validation (event.target, error, customError);
    }
}, true);

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

togglePass.addEventListener('focus', () => password.focus());
// custom styles for the 'show password' button (eye)
password.addEventListener('focus', () => togglePass.style.color = '#268BFE');
password.addEventListener('focusout', () => togglePass.style.color = '#747574');

// -----------------------------------
// Select major
for (let i = 0; i < degree.length; i++) {
    degree[i].addEventListener('click', () => {
        major.innerHTML = majors[i].map((val) => `<option value="bsc_${val}">${val}</option>`).join('');
    });
}
