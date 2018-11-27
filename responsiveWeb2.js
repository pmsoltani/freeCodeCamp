// -----------------------------------
// getting DOM objects
const body = document.body;
const fullName = document.getElementById('name');
const age = document.getElementById('age');
const email = document.getElementById('email');
const password = document.getElementById('password');
const togglePass = document.getElementById('togglePass');
const elements = document
    .getElementById('register')
    .getElementsByTagName('ul')[0]
    .getElementsByTagName('li');

// -----------------------------------
// definitions
const validClass = '<i class="fas fa-check-circle"></i>';
const invalidClass = '<i class="fas fa-times-circle"></i>';

function validation (element, check) {
    if (element.value == check) {
        let spanIconLeft = element.parentElement.getElementsByTagName('span')[0]
        spanIconLeft.innerHTML = validClass;
        spanIconLeft.classList.remove('invalid');
        spanIconLeft.classList.add('valid');
    } else {
        let spanIconLeft = element.parentElement.getElementsByTagName('span')[0]
        spanIconLeft.innerHTML = invalidClass;
        spanIconLeft.classList.remove('valid');
        spanIconLeft.classList.add('invalid');
    }
}

// -----------------------------------
// adding check & cross marks inside inputs for better validation visibility
let element = '';
for (let i = 1; i < elements.length; i++) {
    
    element = elements[i].getElementsByTagName('input')[0];
    element.addEventListener(
            'focusout', 
            () => validation (element, 'J S')
        );
};

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