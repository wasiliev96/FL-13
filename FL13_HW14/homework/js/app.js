// Your code goes here
//@ts-check
/**
 *
 * @param {string} name
 * @param {string} email
 * @constructor
 * @return {{getName: (function(): string), getEmail: (function(): string),
 *   addHomeWorkResult: addHomeWorkResult}}
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
  const getHomeworkResults = () => {
    console.log(_homeworkResults);
  };
  return {
    getName: getName,
    getEmail: getEmail,
    addHomeWorkResult: addHomeWorkResult,
    getHomeworkResults: getHomeworkResults,
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
  const _homeworkResults = [];

  const printStudentsList = () => {
    _studentsList.map((student) => {
      console.log(`name: ${student.name}, email: ${student.email}`);
      const studentResults = [];
      _homeworkResults.map((homeworkResult) => {
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

  /**
   *
   * @param {{string:topic}, [{email: string, success:boolean}]} homeworkResults
   */
  const addHomeworkResults = (homeworkResults) => {
    _homeworkResults.push(homeworkResults);
  };

  const printStudentsEligibleForTest = () => {
    _studentsList.forEach((studentRecord) => {
      let studentFailsCounter = 0;
      _homeworkResults.forEach((homeworkRecord) => {
        const records = homeworkRecord.results.filter((result) => {
          return result.email === studentRecord.email;
        });
        records.forEach((record) => {
          record.success || studentFailsCounter++;
        });
      });
      if (studentFailsCounter < failedLimit) {
        console.log(
          `name: ${studentRecord.name}, email: ${studentRecord.email}, counter: ${studentFailsCounter}`
        );
      }
    });
  };
  return {
    printStudentsList: printStudentsList,
    addHomeworkResults: addHomeworkResults,
    printStudentsEligibleForTest: printStudentsEligibleForTest,
  };
}
