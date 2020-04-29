let letterCount = (userstring, letter) =>
  userstring
    .toLowerCase()
    .split("")
    .filter((char) => char === letter.toLowerCase()).length;
