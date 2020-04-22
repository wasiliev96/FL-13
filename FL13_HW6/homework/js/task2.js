// Your code goes here
let word = prompt('Enter word(sentence):');

/**
 *
 * @param str - user word
 * @returns {string} - user output
 */
function extractMiddle(str) {
    let position, length;
    if (str.length === 0) return 'Invalid value';
    if (str.length % 2 === 1) {
        position = str.length / 2;
        length = 1;
    } else {
        position = str.length / 2 - 1;
        length = 2;
    }
    return `Your word(sentence): ${str}\nMiddle character(s): \"${str.substring(position, position + length)}\"`;
}

alert(extractMiddle(word));
