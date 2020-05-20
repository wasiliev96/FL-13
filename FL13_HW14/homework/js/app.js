// Your code goes here

//@ts-check
/**
 *
 * @constructor
 * @return {{getHomeworkResults: getHomeworkResults, getName: (function():
 *   void), getEmail: (function(): void), addHomeWorkResult:
 *   addHomeWorkResult}}
 * @param inputName
 * @param inputEmail
 */
function Student(inputName, inputEmail) {
  const name = inputName;
  const email = inputEmail;
  const homeworkResults = [];

  const getName = () => name;
  const getEmail = () => email;
  /**
   *
   * @param {string} topic
   * @param {boolean} success
   */
  const addHomeworkResult = (topic, success) => {
    homeworkResults.push({topic, success});
  };
  const getHomeworkResults = () => {
    console.log(homeworkResults);
  };
  return {
    getName: getName,
    getEmail: getEmail,
    addHomeworkResult: addHomeworkResult,
    getHomeworkResults: getHomeworkResults
  };
}

function FrontendLab(students, failedLimit) {
  let failedHomeworksLimit = failedLimit;

  const studentsList = students.map((student) => new Student(student.name, student.email));

  const addHomeworkResults = (homeworkResults) => {
    // Student.apply(studentsList[0], studentsList[0].name,
    // studentsList[0].email).getHomeworkResults(); work!
    homeworkResults.results.forEach((result) => {
      const student = studentsList.find(student => student.getEmail() === result.email);
      student.addHomeworkResult(homeworkResults.topic, result.success);
    });
  };
  const printStudentsList = () => {
    studentsList.forEach(student => {
      console.log(`name: ${student.getName()}, email: ${student.getEmail()}`);
      console.log(student.getHomeworkResults());
    });
  };
  return {
    printStudentsList: printStudentsList,
    addHomeworkResults: addHomeworkResults
  };
}
