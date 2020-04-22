// Your code goes here
const run = () => {
    let checkValue = parseFloat(prompt('Enter check value: ', '100'));
    if (typeof checkValue === 'number' && checkValue > 0) {
        let percentage = parseFloat(prompt('Enter tip percentage: ', '20')),
            tip = checkValue * percentage / 100;
        if (typeof percentage === 'number' && percentage > 0 && percentage < 100) {
            alert(
                `Check value: ${checkValue.toFixed(2)}
Tip: ${percentage.toFixed(2)}%
Tip amount:${tip.toFixed(2)}
Total sum to pay: ${(checkValue + checkValue * percentage / 100).toFixed(2)}`);
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
