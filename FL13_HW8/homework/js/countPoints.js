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
