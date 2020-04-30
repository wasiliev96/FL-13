// task 1: string<=>number converter
let convert = (input) => {
  let answer = [];
  for (let i = 0; i < input.length; i++) {
    answer.push(
      typeof input[i] === "number" ? input[i] + "" : parseInt(input[i])
    );
  }
  return answer;
};
