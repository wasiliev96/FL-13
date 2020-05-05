// task 1: string<=>number converter
const convert = (...args) => {
  const answer = [];
  for (let i = 0; i < args.length; ++i) {
    if (typeof args[i] === 'number') {
      answer.push(args[i] + '');
    } else {
      answer.push(parseInt(args[i]));
    }
  }
  return answer;
};

// task 2: execute function to all array items
const executeforEach = (arr, handler) => {
  for (let i = 0; i < arr.length; ++i) {
    handler(arr[i]);
  }
};

// task 3: return transformed by callback array
const mapArray = (arr, handler) => {
  const answer = [];
  for (const item of arr) {
    answer.push(handler(parseInt(item)));
  }
  return answer;
};

// task 4: return filtered by callback array. Use func #2
const filterArray = (arr, handler) => {
  const answer = [];
  executeforEach(arr, item => {
    handler(item) && answer.push(item);
  });
  return answer;
};

// task 5: check if array contains passed $param value. Use func #2
const containsValue = (arr, param) => {
  let isContains = false;
  executeforEach(arr, item => {
    if (item === param) {
      isContains = true;
    }
  });
  return isContains;
};

// task 6: reverse passed string. return(?) it
const flipOver = str => {
  let answer = '';
  for (let i = str.length - 1; i >= 0; i--) {
    answer += str[i];
  }
  return answer;
};

// task 7: create array from range
const makeListFromRange = range => {
  let list = [];
  for (let i = range[0]; i <= range[1]; i++) {
    list.push(i);
  }
  return list;
};

// task 8: return array of objects values by passed key
const getArrayOfKeys = (objects, key) => {
  const answer = [];
  executeforEach(objects, object => {
    answer.push(object[key]);
  });
  return answer;
};

// task 9: replace all numbers <20 and >10 with '*'. return new array. Use #3
const substitute = arr => {
  const MIN = 10,
    MAX = 20;
  return mapArray(arr, function (item) {
    if (item > MIN && item < MAX) {
      return '*';
    }
    return item;
  });
};

// task 10: return date that was $(amount) days before passed date
const getPastDay = (date, amount) => {
  let answer = new Date(date);
  answer.setDate(answer.getDate() - amount);
  return `${ answer.getDate() }`;
};

// task 11: return formatted date
const formatDate = date => {
  const ONE_CHAR_MAX_LENGTH = 9;
  const year = date.getFullYear();
  let day = date.getDate();
  day = day <= ONE_CHAR_MAX_LENGTH ? '0' + day : day;

  let month = date.getMonth() + 1;
  month = month <= ONE_CHAR_MAX_LENGTH ? '0' + month : month;

  let hours = date.getHours();
  hours = hours <= ONE_CHAR_MAX_LENGTH ? '0' + hours : hours;
  let minutes = date.getMinutes();
  minutes = minutes <= ONE_CHAR_MAX_LENGTH ? '0' + minutes : minutes;
  return `${ year }/${ month }/${ day } ${ hours }:${ minutes }`;
};
