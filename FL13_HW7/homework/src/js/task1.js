// Your code goes here
const USERNAME_MIN_LENGTH = 4
let username = prompt('Enter username: ')
let password = prompt('Enter password')
if (!username) {
  alert('Canceled.')
}

run(username, password)

function run (username, password) {
  if (username.length < USERNAME_MIN_LENGTH) {
    alert('I don\'t know any users having name length less than 4 symbols')
  } else {
    username === 'User' || username === 'Admin' ? validatePassword(password) :
      alert('I don\'t know you')
  }
}

let validatePassword = (password) => {
  console.log(password)
}

