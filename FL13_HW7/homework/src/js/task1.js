// Your code goes here
const USERNAME_MIN_LENGTH = 4
let username = prompt('Enter username: ')
let password = prompt('Enter password')
if (!isEmpty(username)) {
  alert('Canceled.')
} else {
  run(username, password)
}

function run (username, password) {
  if (username.length < USERNAME_MIN_LENGTH) {
    alert('I don\'t know any users having name length less than 4 symbols')
  } else {
    username === 'User' || username === 'Admin' ? validatePassword(username,
      password) :
      alert('I don\'t know you')
  }
}

let validatePassword = (username, password) => {
  if (isEmpty(password)) {
    alert('Canceled.')
  } else {
    if (username === 'User' && password === 'UserPass' || username ===
        'Admin' && password === 'RootPass') {
      greetings(username)
    } else {
      alert('Wrong password')
    }
  }
}

function greetings (username) {
  console.log(username)
}

function isEmpty (input) {
  return !input
}
