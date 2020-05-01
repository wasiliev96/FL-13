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

convert("1", 2, 3, "4"); // [1, '2', '3', 4]

// task 2: execute function to all array items
let executeforEach = (arr, handler) => {
  for (let i = 0; i < arr.length; ++i) {
    handler(arr[i]);
  }
};

executeforEach([1, 2, 3], function (el) {
  console.log(el * 2);
}); // 2 4 6

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
}); // returns [5, 8, 11]

// task 4: return filtered by callback array. Use func #2
let filterArray = (arr, handler) => {
  const answer = [];
  executeforEach(arr, (item) => {
    handler(item) && answer.push(item);
  });
  return answer;
};

filterArray([2, 5, 8], function (el) {
  return el % 2 === 0;
});
// returns [2, 8]

// task 5: check if array contains passed $param value. Use func #2
let containsValue = (arr, param) => {
  let isContains = false;
  executeforEach(arr, (item) => {
    if (item === param) {
      isContains = true;
    }
  });
  return isContains;
};

containsValue([2, 5, 8], 2); // returns true
containsValue([12, 4, 6], 5); // returns false

// task 6: reverse passed string. return(?) it
let flipOver = (str) => {
  let answer = "";
  for (let i = str.length - 1; i >= 0; i--) {
    answer += str[i];
  }
  return answer;
};

flipOver("hey world"); // 'dlrow yeh'

// task 7: create array from range
let makeListFromRange = (range) => {
  let list = [];
  for (let i = range[0]; i <= range[1]; i++) {
    list.push(i);
  }
  return list;
};

makeListFromRange([2, 7]); // [2, 3, 4, 5, 6, 7]

// task 8: return array of objects values by passed key
let getArrayOfKeys = (objects, key) => {
  const answer = [];
  executeforEach(objects, (object) => {
    answer.push(object[key]);
  });
  return answer;
};

const fruits = [
  { name: "apple", weight: 0.5 },
  { name: "pineapple", weight: 2 },
];
getArrayOfKeys(fruits, "name"); // returns [‘apple’, ‘pineapple’]

// task 9: replace all numbers <20 and >10 with '*'. return new array. Use #3
let substitute = (arr) => {
  return mapArray(arr, (item) => (item > 10 && item < 20 && "*") || item);
};

substitute([58, 14, 48, 12, 31, 19, 10]); // returns [58, '*', 48, '*', 31, '*', 10]

// task 10: return date that was $(amount) days before passed date
let getPastDay = (date, amount) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Octr",
    "Nov",
    "Dec",
  ];
  let dayz = new Date(date);
  dayz.setDate(dayz.getDate() - amount);
  return `${dayz.getDate()} ${months[dayz.getMonth()]} ${dayz.getFullYear()}`;
};

const date = new Date(2020, 0, 2);
getPastDay(date, 1); // 1, (1 Jan 2020)
getPastDay(date, 2); // 31, (31 Dec 2019)
getPastDay(date, 365); // 2, (2 Jan 2019)

// task 11: return formatted date
let formatDate = (date) => {
  const year = date.getFullYear();
  let day = date.getDate();
  day = day < 10 ? "0" + day : day;

  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;

  let hours = date.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

formatDate(new Date("6/15/2019 09:15:00")); // "2019/06/15 09:15"
formatDate(new Date()); // "2020/04/07 12:56" // gets current local time
