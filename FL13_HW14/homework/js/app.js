function Student(inputName, inputEmail) {
  const name = inputName;
  const email = inputEmail;
  const homeworkResults = [];

  const getName = () => name;
  const getEmail = () => email;

  const addHomeworkResult = (topic, success) => {
    homeworkResults.push({topic, success});
  };
  const getHomeworkResults = () => {
    return homeworkResults;
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
  const printStudentsEligibleForTest = () => {
    studentsList.forEach(student => {
      let failCounter = 0;
      student.getHomeworkResults().forEach((result) => {
        if (!result.success) {
          failCounter++;
        }
      });
      if (failCounter < failedHomeworksLimit) {
        console.log(`name: ${student.getName()}, email: ${student.getEmail()}`);
      }
    });
  };
  return {
    printStudentsList: printStudentsList,
    addHomeworkResults: addHomeworkResults,
    printStudentsEligibleForTest: printStudentsEligibleForTest
  };
}
