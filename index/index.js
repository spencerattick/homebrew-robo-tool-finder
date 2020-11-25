const readline = require("readline");
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let toolCategoryInput;
let specificCommandInput;

//instructions for using Robo Tool Helper
console.log(chalk.bgMagenta('🎉 Welcome to the ' + chalk.bold(chalk.underline('Robo Tool Finder')) + '! To use this tool, just answer each question prompt by entering the NUMBER to the left of the text you\'d like to indicate. If you have any questions reach out to @spencer on Slack. 🎉\n\n'))

//prompt to learn which tool user wants to use
rl.question(chalk.magenta("Which tool are you trying to find a command for? \n ") + "1) Personas \n\n 2) Warehouses \n\n 3) Cloud Sources \n\n 4) Replay \n\n 5) Robo \n\n" + chalk.cyan("I'm looking for... "), function(toolCategory) {

    determineToolCategory(toolCategory);

    listToolOptions();


    rl.question(chalk.cyan('\nThe tool I want information about is...'), function(specificTool) {
      console.log('------------------------------------------------------');
      console.log('------------------------------------------------------');
      showSpecificToolDetails(specificTool);
    });
});

//recognize tool category and respond dynamically with options menu
function determineToolCategory(toolCategoryUserInput) {
  if (toolCategoryUserInput.toLowerCase() === 'personas' || toolCategoryUserInput === '1') {
    toolCategoryInput = 'Personas';
  } else if (toolCategoryUserInput.toLowerCase() === 'warehouses' || toolCategoryUserInput === '2') {
    toolCategoryInput = 'Warehouses';
  } else if (toolCategoryUserInput.toLowerCase() === 'cloud sources' || toolCategoryUserInput === '3') {
    toolCategoryInput = 'Cloud Sources';
  } else if (toolCategoryUserInput.toLowerCase() === 'replay' || toolCategoryUserInput === '4') {
    toolCategoryInput = 'Replay';
  } else if (toolCategoryUserInput.toLowerCase() === 'robo' || toolCategoryUserInput === '5') {
    toolCategoryInput = 'Robo';
  } else {
    console.log(chalk.red(chalk.bold('\n\nI\'m sorry, that input is not valid. Please try again or contact @spencer on Slack for help.')));
    rl.close();
  }
  console.log('------------------------------------------------------');
  console.log('------------------------------------------------------');
  console.log(chalk.magenta('\nHere are your tool options for '+ chalk.bold(chalk.underline(`${toolCategoryInput}`)) + ':\n'));
}

function listToolOptions() {
  if (toolCategoryInput === 'Personas') {
    for (const num in personasToolOptions) {
      console.log(`${personasToolOptions[num].option}\n`)
    }
  } else if (toolCategoryInput === 'Warehouses') {
    for (const num in warehousesToolOptions) {
      console.log(`${warehousesToolOptions[num].option}\n`)
    }
  } else if (toolCategoryInput === 'Cloud Sources') {
    for (const num in cloudSourcesToolOptions) {
      console.log(`${cloudSourcesToolOptions[num].option}\n`)
    }
  } else if (toolCategoryInput === 'Replay') {
    for (const num in replayToolOptions) {
      console.log(`${replayToolOptions[num].option}\n`)
    }
  } else if (toolCategoryInput === 'Robo') {
    for (const num in roboToolOptions) {
      console.log(`${roboToolOptions[num].option}\n`)
    }
  }
}

function showSpecificToolDetails(toolNumber) {
  if (toolCategoryInput === 'Personas') {
    console.log(chalk.magenta('\n\Here are details about the following tool - ' + chalk.bold(chalk.underline(`${personasToolOptions[toolNumber].option}:\n`))));
    console.log(`Command: ${personasToolOptions[toolNumber].command}\n`);
    console.log(`Description: ${personasToolOptions[toolNumber].description}\n`);
    console.log(`Documentation Link: ${personasToolOptions[toolNumber].documentationLink}\n`);
  } else if (toolCategoryInput === 'Warehouses') {
    for (const num in warehousesToolOptions) {
      console.log(`${warehousesToolOptions[num].option}\n`)
    }
  } else if (toolCategoryInput === 'Cloud Sources') {
    for (const num in cloudSourcesToolOptions) {
      console.log(`${cloudSourcesToolOptions[num].option}\n`)
    }
  } else if (toolCategoryInput === 'Replay') {
    for (const num in replayToolOptions) {
      console.log(`${replayToolOptions[num].option}\n`)
    }
  } else if (toolCategoryInput === 'Robo') {
    for (const num in roboToolOptions) {
      console.log(`${roboToolOptions[num].option}\n`)
    }
  }
}


const personasToolOptions = {
  '1': {
    option: '1) list personas spaces (by workspace)',
    description: '',
    command: '$ robo prod rpc http://space-service.segment.local/rpc Space.List workspace_slug=<WORKSPACE_SLUG> | jq .',
    documentationLink: ''
  },
  '2': {
    option: '2) connect to prod workbench',
    description: '',
    command: '$ robo prod.ssh',
    documentationLink: ''
  }
}


//message indicating tool has closed
rl.on("close", function() {
    console.log(chalk.bgMagenta('\n\nThank you for using the ' + chalk.bold(chalk.underline('Robo Tool Finder')) + '! See you again next time!'));
    process.exit(0);
});
