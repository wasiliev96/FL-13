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
convert(3, "2"); /*?*/
