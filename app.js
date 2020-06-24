// MENU FUNCTIONS
const exit = document.querySelector('.logo_container');
const header = document.querySelector('header');
const menu = document.querySelector('.menu_button');

menu.addEventListener('click', function () {
  header.classList.toggle('active');
});

exit.addEventListener('click', function () {
  header.classList.toggle('active');
});

// SIGN UP/LOGIN FUNCTION
const signup = document.querySelector('#form_container');
const login_pw = document.querySelector('#login');
const login = document.querySelector('.login_input_container');

login_pw.addEventListener('click', function () {
  login.classList.toggle('active');
  signup.classList.toggle('active');
})

const signup_link = document.querySelector('#signup');

signup_link.addEventListener('click', function () {
  signup.classList.toggle('active');
  login.classList.toggle('active');
})

// SHOW/HIDE PASSWORD FUNCTION
const show_pw = document.querySelector('.fas.fa-eye');
const hide_pw = document.querySelector('.fas.fa-eye-slash');
const input = document.querySelector('#login_pw');

show_pw.addEventListener('click', function () {
  hide_pw.classList.toggle('active');
  show_pw.classList.toggle('active');
  if (input.type === 'password') {
    input.type = 'text';
  }
})

hide_pw.addEventListener('click', function () {
  hide_pw.classList.toggle('active');
  show_pw.classList.toggle('active');
  if (input.type === 'text') {
    input.type = 'password';
  }
})

// FORGOT PASSWORD FUNCTIONS
const password = document.querySelector('#forgot_pw');
const pw_reset = document.querySelector('.password_container');
const cancel = document.querySelector('#cancel')

password.addEventListener('click', function () {
  login.classList.toggle('active');
  pw_reset.classList.toggle('active');
})

cancel.addEventListener('click', function () {
  login.classList.toggle('active');
  pw_reset.classList.toggle('active');
})

// CONSTRUCTOR FUNCTIONS & METHODS
function AccountInfo(firstname, lastname, email) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.email = email;
}

function UI() {

}

UI.prototype.getSignupInfo = function (profiles) {
  const list = document.querySelector('#member_list');

  const row = document.createElement('tr');

  let count = 0;

  row.innerHTML = `
  <td>${count}</td>
  <td>${profiles.firstname}</td>
  <td>${profiles.lastname}</td>
  <td>${profiles.email}</td>
  <td><i class='fas fa-times'></td>`;
  list.appendChild(row);
}

UI.prototype.clearFileds = function () {
  document.querySelector('#first').value = '';
  document.querySelector('#last').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('#password').value = '';
  document.querySelector('#confirm_pw').value = '';
  document.querySelector('#login_user').value = '';
  document.querySelector('#login_pw').value = '';
}

UI.prototype.removeAccount = function (target) {
  confirm('Are you sure? Hit ok to delete.');
  if (target.className === 'fas fa-times') {
    target.parentElement.parentElement.remove();
  }
}

UI.prototype.showAlert = function (message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  let container = document.querySelector('#form_container');
  let signup = document.querySelector('.test.input_container');
  let signup_page = container.insertBefore(div, signup);

  console.log(signup_page, signup);
  console.log(login.id);

  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);

  container.style.transition = 'all .3 ease-in-out';
}

// SIGN UP FORM FUNCTIONS
document.querySelector(".submit").addEventListener('click', function (e) {
  // Gets value of input field
  const first = document.querySelector('#first').value,
    last = document.querySelector('#last').value,
    email = document.querySelector('#email').value;

  const password = document.querySelector('#password').value;
  const confirm_pw = document.querySelector('#confirm_pw').value;

  // Instanciates AccountInfo constructor
  const profiles = new AccountInfo(first, last, email);

  // Instanciates UI constructor
  const ui = new UI();

  //showAlert condition statement 
  if (first === '' || last === '' || email === '' || password === '' || confirm_pw === '') {
    ui.showAlert('Fields cannot be empty', 'error');
  } else {
    ui.getSignupInfo(profiles);
    ui.clearFileds();
    ui.showAlert('Member Added!', 'success');
    Store.addMember(profiles);
  }

  e.preventDefault();
})

// REMOVE ACCOUNT FUNCTION
document.querySelector('table').addEventListener('click', function (e) {
  // Instanciates AccountInfo constructor
  const ui = new UI();

  // UI METHOD
  ui.removeAccount(e.target);

  Store.removeMember(e.target.parentElement.previousElementSibling.textContent);

})

// MEMBER FUNCTION SECTION
const members_btn = document.querySelector('.members');
const table_data = document.querySelector('table');
// console.log(members_btn);

members_btn.addEventListener('click', function () {
  if (login.classList.contains('active')) {
    alert('Must signup to access')
    return false;
  } else if (pw_reset.classList.contains('active')) {
    alert('Must signup to access')
    return false;
  } else {
    table_data.classList.toggle('active');
    signup.classList.toggle('active');
  }
})

// LOGIN FUNCTION CONSTRUCTOR
function Login(username, password) {
  this.username = username;
  this.password = password;
}

// LOGIN UI CONSTRUCTOR FOR PROTOTYPES
function UIlogin() { }

// SHOW ALERT METHOD
UIlogin.prototype.showAlert = function (message, className) {
  console.log(message, className);
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  let container = document.querySelector('.login_input_container');
  let input_container = document.querySelector('.login.input_container');
  div.style.marginBottom = '15px';
  container.insertBefore(div, input_container);

  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
}

UIlogin.prototype.fieldValidation = function (message, className) {
  console.log(message, className);
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  let container = document.querySelector('.login_input_container');
  let input_container = document.querySelector('.login.input_container');
  div.style.marginBottom = '5px';
  container.insertBefore(div, input_container);

  console.log(container, input_container);
  // console.log(signup_page, signup);
  // console.log(login.id);

  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
}

document.querySelector('#login_submit').addEventListener('click', function () {

  const username = document.querySelector('#login_user').value;
  const password = document.querySelector('#login_pw').value;

  const login_page = new Login(username, password);

  const ui = new UIlogin();
  const newui = new UI()

  if (username === '' || password === '') {
    ui.showAlert('Fields cannot be left empty', 'error');
  } else if (username.length < 6) {
    ui.fieldValidation(`Username must be 6 or more characters.`, 'error');
  } else if (password.length < 6) {
    ui.fieldValidation(`Password must be 6 or more characters.`, 'error');
  } else {
    ui.showAlert('Login Successful!', 'success');
    newui.clearFileds();
  }
})

// RESET PASSWORD FUNCTION
document.querySelector('#submit').addEventListener('click', function () {

  // Input variable
  const email_input = document.querySelector('#email_field').value = '';

  let mail = document.querySelector('.fas.fa-envelope');

  let input_container = document.querySelector('.password_container .input_container');

  mail.style.color = 'rgb(219, 219, 219)';
  input_container.style.borderBottom = '1px solid black';

})

const email_input = document.querySelector('#email_field');
email_input.addEventListener('keyup', function () {

  // Variables
  // Input variable
  let mail = document.querySelector('.fas.fa-envelope');

  let input_container = document.querySelector('.password_container .input_container');

  let emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // Conditional Statement
  if (email_input.value === '') {
    mail.style.color = 'rgb(219, 219, 219)';
    input_container.style.borderBottom = '1px solid black';
  } else if (!email_input.value.match(emailValidation)) {
    mail.style.color = 'red';
    input_container.style.borderBottom = '1px solid red';
  } else {
    mail.style.color = 'green';
    input_container.style.borderBottom = '1px solid green';
  }
})

// LOCAL STORAGE CLASS
class Store {
  static getMembers() {
    let members;
    if (localStorage.getItem('members') === null) {
      members = [];
    } else {
      members = JSON.parse(localStorage.getItem('members'));
    }
    return members;
  }

  // Display 
  static displayMembers() {
    const members = Store.getMembers();

    members.forEach(function (profiles) {
      const ui = new UI();

      // Add member to UI
      ui.getSignupInfo(profiles);
    })

  }

  static addMember(profiles) {
    const members = Store.getMembers();

    members.push(profiles);

    localStorage.setItem('members', JSON.stringify(members));
  }

  static removeMember(email) {
    const members = Store.getMembers();

    members.forEach(function (profile, index) {
      if (profile.email === email) {
        members.splice(index, 1);
      }
    });

    localStorage.setItem('members', JSON.stringify(members));
  }
}

// DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', Store.displayMembers)