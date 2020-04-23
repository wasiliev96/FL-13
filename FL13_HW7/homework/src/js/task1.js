// Your code goes here
const USERNAME_MIN_LENGTH = 4;
const EVENING_POINT_HOUR = 20;
// create user credentials database
let credentials = {
  'User': 'UserPass',
  'Admin': 'RootPass'
};

function greetings (username) {
  // show greetings depend on username and time
  let currentTime = new Date().getHours();
  alert(`Good ${ currentTime < EVENING_POINT_HOUR
    ? 'day'
    : 'evening' }, dear ${ username }`);
}

let validatePassword = (username, password) => {
  // if password empty - exit
  if (!password) {
    alert('Canceled.');
    return false;
  }
  // pass if password matches to record in our "database"
  if (password === credentials[username]) {
    return true;
  }
  // otherwise - exit
  alert('Wrong password');
  return false;
};

function validateUsername (username) {
  if (username.length < USERNAME_MIN_LENGTH) {
    alert('I don\'t know any users having name length less than 4 symbols');
    return false;
  }
  // if username exist in our "database"  - pass
  if (username in credentials) {
    return true;
  }
  // if not exist - exit
  alert('I don\'t know you');
  return false;
}

// Main flow. Program starts here
function run () {
  let username = prompt('Enter username: ');
  // exit if username empty
  if (!username) {
    alert('Canceled.');
    return;
  }
  // if username exist...
  if (validateUsername(username)) {
    let password = prompt('Enter password');
    // exit if password empty
    if (!password) {
      alert('Canceled.');
      return;
    }
// ...or validate password if it's not empty
    if (validatePassword(username, password)) {
      // and if password is valid - show greetings
      greetings(username);
    }
  }
}

run();
