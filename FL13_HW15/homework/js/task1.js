function assign(target, letArgs) {
  if (target == null) {
    throw new TypeError("Cannot convert (undefined|null) to object");
  }

  const to = Object(target);

  for (let index = 1; index < arguments.length; index++) {
    const nextSource = arguments[index];

    if (nextSource != null) {
      // Skip if undefined or null
      for (let nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
}
//
// const paymentCard = { cash: "100$" };
// const creditCard = { creditLimit: "50$", cash: "100$" };
// const universalCard = assign({}, creditCard, paymentCard); //=>{creditLimit:'50$',
// // 'cash:100$'}
// console.log(universalCard);
