// Your code goes here
const USERNAME_MIN_LENGTH = 4
const EVENING_POINT_HOUR = 20
let credentials = {
  'User': 'UserPass',
  'Admin': 'RootPass'
}

function greetings (username) {
  let currentTime = new Date().getHours()
  alert(`Good ${ currentTime < EVENING_POINT_HOUR
    ? 'day'
    : 'evening' }, dear ${ username }`)
}

let validatePassword = (username, password) => {
  if (!password) {
    alert('Canceled.')
    return false
  }
  if (password === credentials[username]) {
    return true
  }
  alert('Wrong password')
  return false
}

function validateUsername (username) {
  if (username.length < USERNAME_MIN_LENGTH) {
    alert('I don\'t know any users having name length less than 4 symbols')
    return false
  }
  if (username in credentials) {
    return true
  }
  alert('I don\'t know you')
  return false
}

function run () {
  let username = prompt('Enter username: ')
  if (!username) {
    alert('Canceled.')
    return
  }
  if (validateUsername(username)) {
    let password = prompt('Enter password')
    if (!password) {
      alert('Canceled.')
      return
    }
    if (validatePassword(username, password)) {
      greetings(username)
    }
  }
}

run()
