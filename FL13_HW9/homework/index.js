// task 1: string<=>number converter
let convert = (...args) => {
  let answer = [];
  for (let i = 0; i < args.length; ++i) {
    if (typeof args[i] == "number") {
      answer.push(args[i] + "");
    } else {
      answer.push(parseInt(args[i]));
    }
  }
  return answer;
};
convert(3, "2");

// task 2: execute function to all array items
let executeForEach = (arr, handler) => {
  for (let i = 0; i < arr.length; ++i) {
    handler(arr[i]);
  }
};
executeForEach([1, 2, 3, 4], (a) => a * 2);
