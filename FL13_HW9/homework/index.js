// task 1: string<=>number converter
let convert = (...args) => {
  const answer = [];
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

// task 3: return transformed by callback array
let mapArray = (arr, handler) => {
  const answer = [];
  for (const item of arr) {
    answer.push(handler(parseInt(item)));
  }
  return answer;
};

mapArray([2, "5", 8], function (el) {
  return el + 3;
});

// task 4: return filtered by callback array. Use func #2
let filterArray = (arr, handler) => {
  const answer = [];
  executeForEach(arr, (item) => {
    handler(item) && answer.push(item);
  });
  return answer;
};

filterArray([2, 5, 8], function (el) {
  return el % 2 === 0;
});

// task 5: check if array contains passed $param value. Use func #2
let containsValue = (arr, param) => {
  let isContains = false;
  executeForEach(arr, (item) => {
    if (item === param) {
      isContains = true;
    }
  });
  return isContains;
};

containsValue([2, 5, 8], 2);
containsValue([12, 4, 6], 5);

// task 6: reverse passed string. return(?) it
let flipOver = (str) => {
  let answer = "";
  for (let i = str.length - 1; i >= 0; i--) {
    answer += str[i];
  }
  return answer;
};

flipOver("hey world");

// task 7: create array from range
let makeListFromRange = (range) => {
  let list = [];
  for (let i = range[0]; i <= range[1]; i++) {
    list.push(i);
  }
  return list;
};

makeListFromRange([2, 7]);
