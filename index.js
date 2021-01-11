const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");


// ? What is your GitHub username? calvincarter
// ? What is your project's name? demo_day_project2
// ? Please write a short description of your project badass project
// ? What kind of license should your project have? GPL 3.0
// ? What command should be run to install dependencies? npm i
// ? What command should be run to run tests? npm test
// ? What does the user need to know about using the repo? nothing just welcome all hands on deck
// ? What does the user need to know about contributing to the repo? please help

 inquirer.prompt([
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username",
       
    },
    {
        type: "input",
        message: "What is your Projects Name?",
        name: "projectName" 
       
    },
    {
        type: "input",
        message: "Write a short description of your project",
        name: "projectInfo"    
    },
        {
      type: 'input',
      name: 'dependencies',
      message: 'What command should be run to install dependencies?',
      default: 'npm i'
    },
    {
      type: 'input',
      name: 'tests',
      message: 'What command should be run to run tests?',
      default: 'npm test'
    },
    {
      type: 'input',
      name: 'userKnowledge',
      message: 'What does the user need to know about using the repo?'
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'What does the user need to know about contributing to the repo?'
    },
    {
        type: "list",
        message: "What type of license do you want",
        name: "license",
        choices: ["Apache", "IBM", "Mozilla", "MIT"]
    },
]).then(function(answers){
   

    if (answers.license === 'Mozilla') {
      answersURL = 'https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg'
    };
    if (answers.license === 'Apache') {
      answersURL = 'https://img.shields.io/badge/License-Apache%202.0-blue.svg'
    };
    if (answers.license === 'IBM') {
      answersURL = 'https://img.shields.io/badge/License-IPL%201.0-blue.svg'
    };
    if (answers.license === 'MIT') {
      answersURL = 'https://img.shields.io/badge/License-MIT-yellow.svg'
    };

    axios.get("https://api.github.com/users/" + answers.username).then(function(gitResponse){

        let gitImg = gitResponse.data.avatar_url;

        let content = 
`# ${answers.projectName}

![Visitors in today](https://visitor-count-badge.herokuapp.com/today.svg?repo_id=ChristopherNeill.clirmgen)
![License](${answersURL})

​
## Description

${answers.projectInfo}

## Table of Contents 
* [Installation](#installation)

* [Usage](#usage)
​
* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies, run the following command:
\`\`\`
${answers.dependencies}
\`\`\`
## Usage
​
${answers.userKnowledge}

## License

This project is licensed under the ${answers.license} license.

## Contributing

${answers.contributing}

## Tests

To run tests, run the following command:
\`\`\`
${answers.tests}
\`\`\`

## Questions
        
<img src="${gitImg}" alt="avatar" style="border-radius: 16px" width="30" />

If you have any questions about the repo, contact [${answers.username}]`;
        
        fs.writeFile("README1.md",content, function (err){} )
        });
    })