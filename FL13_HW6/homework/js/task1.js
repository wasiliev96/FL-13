// Your code goes here
const run = () => {
    const PERCENTAGE_MAX = 100;
    const DIGITS_AFTER_COMMA = 2;
    let checkValue = parseFloat(prompt('Enter check value: ', '100'));
    if (typeof checkValue === 'number' && checkValue > 0) {
        let percentage = parseFloat(prompt('Enter tip percentage: ', '20')),
            tip = checkValue * percentage / PERCENTAGE_MAX;
        if (typeof percentage === 'number' && percentage > 0 && percentage < PERCENTAGE_MAX) {
            alert(
                `Check value: ${checkValue.toFixed(DIGITS_AFTER_COMMA)}
Tip: ${percentage.toFixed(DIGITS_AFTER_COMMA)}%
Tip amount:${tip.toFixed(DIGITS_AFTER_COMMA)}
Total sum to pay: ${(checkValue + checkValue * percentage / PERCENTAGE_MAX).toFixed(DIGITS_AFTER_COMMA)}`);
        } else {
            printError('invalid Percentage');
        }
    } else {
        printError('invalid check value');
    }
};

/**
 *
 * @param errorcode - string, error short description
 */
function printError(errorcode) {
    alert('Error: ' + errorcode);
}

run();
