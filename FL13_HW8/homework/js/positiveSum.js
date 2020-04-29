let positiveSum = (nums) => {
  return nums
    .filter(function (a) {
      return a >= 0;
    })
    .reduce(function (a, b) {
      return a + b;
    });
};
