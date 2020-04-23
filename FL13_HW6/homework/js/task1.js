const PERCENTAGE_MAX = 100;
const DIGITS_AFTER_COMMA = 2;

// removing spaces from user inputs and parse to float
const INPUT_VALUES_QUANTITY = 2; // for eslint
let checkValue = parseFloat( prompt( 'Enter check:', '200' ).replace( /\s/g, '' ) );
let tipPercentage = parseFloat( prompt( 'Enter tip percent:', '15' ).replace( /\s/g, '' ) );

function calculate ( checkValue, tipPercentage ) {
    // Filter if values are positive and percentage lower than 100
    return [ checkValue, tipPercentage ].filter( function ( i ) {
        return i >= 0 && tipPercentage <= PERCENTAGE_MAX;
        // if filtered array is equal start array - return message
    } ).length === INPUT_VALUES_QUANTITY
           ? `Check value: ${ checkValue.toFixed( DIGITS_AFTER_COMMA ) }$\n
Tip: ${ tipPercentage.toFixed( DIGITS_AFTER_COMMA ) }%\n
Tip amount: ${ (checkValue * tipPercentage / PERCENTAGE_MAX).toFixed( DIGITS_AFTER_COMMA ) }$\n
Total sum to pay: ${ (checkValue + checkValue * tipPercentage / PERCENTAGE_MAX).toFixed( DIGITS_AFTER_COMMA ) }$
`
        // otherwise, return error
           : 'Error input';
}

alert( calculate( checkValue, tipPercentage ) );
