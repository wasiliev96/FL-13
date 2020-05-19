// Your code goes here
//@ts-check

/**
 *
 * @param {string} name
 * @param {string} email
 * @constructor
 */
function Student(name, email) {
  const _name = name;
  const _email = email;
  const _homeworkResults = [];

  const getName = () => _name;
  const getEmail = () => _email;
  /**
   *
   * @param {string} topic
   * @param {boolean} success
   */
  const addHomeWorkResult = (topic, success) => {
    _homeworkResults.push({ topic, success });
  };
  return {
    getName: getName,
    getEmail: getEmail,
  };
}

/**
 *
 * @param {array} students
 * @param {number} failedLimit
 * @returns {{printStudentsList: printStudentsList}}
 * @constructor
 */
function FrontendLab(students, failedLimit) {
  let _failedHomeworksLimit = failedLimit;
  const _studentsList = students;

  const printStudentsList = () => {
    listOfStudents.map((student) => {
      console.log(`name: ${student.name}, email: ${student.email}`);
      const studentResults = [];
      homeworkResults.map((homeworkResult) => {
        const record = {};
        record.topic = homeworkResult.topic;
        record.success = homeworkResult.results.find(
          (result) => result.email === student.email
        );
        studentResults.push(record);
      });
      console.log(studentResults);
    });
  };
  return {
    printStudentsList: printStudentsList,
  };
}
