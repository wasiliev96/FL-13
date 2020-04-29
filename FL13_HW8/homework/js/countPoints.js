let countPoints = (pointsArray) => {
  let answer = 0;
  pointsArray.forEach((match) => {
    let matchResult = match.split(":");
    if (matchResult[0] > matchResult[1]) {
      answer += 3;
    } else if (matchResult[0] === matchResult[1]) {
      answer += 1;
    }
  });
  return answer;
};
countPoints([
  "3:1",
  "1:0",
  "0:0",
  "1:2",
  "4:0",
  "2:3",
  "1:1",
  "0:1",
  "2:1",
  "1:0",
]);
