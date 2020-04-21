// Your code goes here
let word = prompt('Enter word');

function getMiddle(string) {
    return string.length % 2 ? string.substr(string.length / 2, 1) : string.substr((string.length / 2) - 1, 2);
}

alert(getMiddle(word));
