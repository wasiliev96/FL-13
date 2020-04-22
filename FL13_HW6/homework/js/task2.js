// Your code goes here
let word = prompt('Enter word(sentence):');

/**
 *
 * @param str - user word
 * @returns {string} - user output
 */
const EQUAL_DIVIDER = 2;

function extractMiddle(str) {
    let position, length;
    if (str.length === 0) {
        return 'Invalid value';
    }
    if (str.length % EQUAL_DIVIDER !== 0) {
        position = str.length / EQUAL_DIVIDER;
        length = 1;
    } else {
        position = str.length / EQUAL_DIVIDER - 1;
        length = EQUAL_DIVIDER;
    }
    return `Your word(sentence): ${str}\nMiddle character(s): "${str.substring(position, position + length)}"`;
}

alert(extractMiddle(word));
