const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



const userData = [];




let employeesArr = [];

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "what is your manager name?",
      },
      {
        type: "input",
        name: "id",
        message: "what is your manager id?",
      },
      {
        type: "input",
        name: "email",
        message: "what is your Manager email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "what is your manager's office number?",
      },
    ])
    .then(function (answers) {
      const myManager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      employeesArr.push(myManager);
      resume();
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "what is your engineer name?",
      },
      {
        type: "input",
        name: "id",
        message: "what is your engineer id?",
      },
      {
        type: "input",
        name: "email",
        message: "what is your engineer email?",
      },
      {
        type: "input",
        name: "github",
        message: "what is your engineer github name?",
      },
    ])
    .then(function (answers) {
      const myEngineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      employeesArr.push(myEngineer);
      resume();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "what is your intern name?",
      },
      {
        type: "input",
        name: "id",
        message: "what is your intern id?",
      },
      {
        type: "input",
        name: "email",
        message: "what is your intern email?",
      },
      {
        type: "input",
        name: "school",
        message: "what is your Intern school name?",
      },
    ])
    .then(function (answers) {
      const myIntern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      employeesArr.push(myIntern);
      resume();
    });
}

function resume() {
  inquirer
    .prompt({
      type: "list",
      name: "Member",
      message: "what type of team member would you like to add?",
      choices: [
        "Manager",
        "Engineer",
        "Intern",
        "I don't want to add anymore team member",
      ],
    })

   
     .then(function (answer) {
      if (answer.Member === "Manager") {
        createManager();
      } else if (answer.Member === "Engineer") {
        createEngineer();
      } else if (answer.Member === "Intern") {
        createIntern();
      } else {

        
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR);
        }
    
        fs.writeFile("./output/team.html", render(employeesArr), function (err) {
          if (err) throw err;
        });
      }
    });
}
resume();



