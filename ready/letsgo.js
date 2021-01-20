#!/usr/bin/env node

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

  console.clear();

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
  let objToUse;

  if (Number(toolNumber) === NaN) {
    console.log(chalk.red('\n\nError: Input should be a number. Please try again.'));
    rl.close();
  }

  if (toolCategoryInput === 'Personas') {
    objToUse = personasToolOptions;
  } else if (toolCategoryInput === 'Cloud Sources') {
    objToUse = cloudSourcesToolOptions;
  } else if (toolCategoryInput === 'Warehouses') {
    objToUse = warehousesToolOptions;
  } else if (toolCategoryInput === 'Replay') {
    objToUse = replayToolOptions;
  } else if (toolCategoryInput === 'Robo') {
    objToUse = toolCategoryUserInput;
  }

  console.clear();

  console.log(chalk.magenta('\n\Here are details about the following tool - ' + chalk.bold(chalk.underline(`${objToUse[toolNumber].option}: \n`))));
  console.log(chalk.bold(chalk.underline('Command:')) + ' ' + objToUse[toolNumber].command +'\n');
  console.log(chalk.bold(chalk.underline('Description:')) + ' ' + objToUse[toolNumber].description +'\n');
  console.log(chalk.bold(chalk.underline('Documentation Link:')) + ' ' + objToUse[toolNumber].documentationLink +'\n');
  rl.close();
}


const personasToolOptions = {
  '1': {
    option: '1) list personas spaces (by workspace)',
    description: 'List spaces and space data for a particular workspace.',
    command: '$ robo prod rpc http://space-service.segment.local/rpc Space.List workspace_slug=<WORKSPACE_SLUG> | jq .',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/552502446/Creating+a+Signature+for+Google+Ad+Manager+and+DV360'
  },
  '2': {
    option: '2) connect to production workbench',
    description: 'Connect to the production workbench in order to look up data or executate commands there.',
    command: '$ robo prod.ssh',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/232161896/Personas+Debugging+Guide+for+success'
  },
  '3': {
    option: '3) connect to Personas database',
    description: 'Connect to SQL database where Audience/Trait data is stored.',
    command: '$ robo personas-db production control',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/232161896/Personas+Debugging+Guide+for+success'
  },
  '4': {
    option: '4) enable/disable Additive SQL Trait feature',
    description: 'Enable or disable the Additive SQL Trait feature (this is not known to all customers).',
    command: 'Follow the instructions in the docs.',
    documentationLink: 'https://paper.dropbox.com/doc/Additive-SQL-Traits--BCmEW~ZTb6sDQihFLRhgkNcnAg-WM4kD1226OapVsPiiQWdh'
  },
  '5': {
    option: '5) disable Audiences with script',
    description: 'Mass disable Audiences programattically (this is not known to all customers).',
    command: 'Follow the instructions in the docs.',
    documentationLink: 'https://paper.dropbox.com/doc/Disabling-audiences-script--BCmJUMRo~JEdOwi~jOpzK2tvAg-Ea72wQFZjay4v8i2humPX'
  }
}

const cloudSourcesToolOptions = {
  '1': {
    option: '1) set source sync frequency',
    description: 'Set the frequency at which a source will sync from the connected integration.',
    command: '$ robo prod tool source custom-frequency --project-id=<id> <duration>',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592749/Cloud+Sources+Guide+for+Success+v2#%E2%86%92-Set-Source-Sync-Frequency'
  },
  '2': {
    option: '2) add a Mongo setting for a project',
    description: 'Add a setting to the Mongo entry for a source.',
    command: '$ tool source settings --project-id=<id> <setting_name> <setting_value>',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592749/Cloud+Sources+Guide+for+Success+v2#%E2%86%92-Update-mongo-settings-for-a-project'
  },
  '3': {
    option: '3) stop a currently running sync',
    description: 'Force a sync that is currently running to stop.',
    command: '$ robo prod tool task force-run source --workspace=<workspace_slug> --project=<project_id> --force',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592749/Cloud+Sources+Guide+for+Success+v2#%E2%86%92-Stop-syncs-that-are-running'
  }
}

const warehousesToolOptions = {
  '1': {
    option: '1) install/upgrage warehouse tool',
    description: 'Install or upgrade "warehouse tool".',
    command: '$ robo prod ensure-warehouse-tool',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Installing-%2F-Upgrading'
  },
  '2': {
    option: '2) start a backfill',
    description: 'Initiate a backfill (replay) from a specified source to a warehouse.',
    command: '$ robo prod warehouse-tool replay -w <warehouse_id> -p <source_id>',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Running-Replays-(aka%3A-%22Backfills%22)'
  },
  '3': {
    option: '3) stop a backfill',
    description: 'Stop a backfill (replay) from a specified source to a warehouse.',
    command: '$ robo prod warehouse-tool sync -w <warehouse_id> -p <source_id> -r <run_id> stop',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Running-Replays-(aka%3A-%22Backfills%22)'
  },
  '4': {
    option: '4) check a backfill',
    description: 'Get the current run details for a backfill.',
    command: '$ o prod warehouse-tool sync -w <warehouse_id> -p <source_id> -r <run_id> [tasks]',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Checking-Sync-Status'
  },
  '5': {
    option: '5) manually start warehouse sync',
    description: 'Manually start a warehouse sync for a particular project.',
    command: '$ robo prod warehouse-tool run -w <warehouse_id> -p <source_id>',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Manually-Start-a-Run'
  },
  '6': {
    option: '6) get information about last run per source',
    description: 'Look up information about the most recent warehouse sync for a specific source.',
    command: '$ robo prod warehouse-tool sync -w <warehouse_id> -p <project_id>',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Checking-Sync-Status'
  },
  '7': {
    option: '7) get information about last run per workspace',
    description: 'Look up information about the most recent warehouse sync for a workspace.',
    command: '$ robo prod warehouse-tool sync -W <workspace_slug>',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Checking-Sync-Status'
  },
  '8': {
    option: '8) connect to customer\'s warehouse',
    description: 'Connect to a customer\'s warehouse in order to run queries.',
    command: '$ robo prod warehouse-tool cli -w <warehouse_id>',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Check-the-Connection-to-a-Customer%E2%80%99s-Warehouse'
  },
  '9': {
    option: '9) check the connection to customer\'s warehouse',
    description: 'Get information about the connection from a customer\'s warehouse to Segment.',
    command: '$ robo prod warehouse-tool ping -w <warehouse_id>',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Check-the-Connection-to-a-Customer%E2%80%99s-Warehouse'
  },
  '10': {
    option: '10) show currently running syncs per warehouse',
    description: 'Get a list of syncs that are currently running per warehouse.',
    command: '$ robo prod warehouse-tool running -w <warehouse_id> [-t replay|run] [-k redshift|posgres|bigquery]',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Show-Currently-Running-Syncs'
  },
  '11': {
    option: '11) show currently running syncs per workspace',
    description: 'Get a list of syncs that are currently running per workspace.',
    command: '$ robo prod warehouse-tool running -W <workspace_slug> [-t replay|run] [-k redshift|posgres|bigquery]',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Show-Currently-Running-Syncs'
  },
  '12': {
    option: '12) show warehouse information',
    description: 'Get information about a certain warehouse.',
    command: '$ robo prod warehouse-tool info -W <workspace_slug>',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Show-Warehouse-Info'
  },
  '13': {
    option: '13) view internal schema',
    description: 'See how the internal schema is set for a particular collection.',
    command: '$ robo prod warehouse-tool schemas -p <source_id> -c <collection> [-w <warehouse_id]',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#View-internal-schema'
  },
  '14': {
    option: '14) change column type',
    description: 'Change the column type of the internal schema.',
    command: 'Refer to the documentation.',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Change-Column-Type'
  },
  '15': {
    option: '15) disable a table from syncing',
    description: 'Disable a table from syncing to a warehouse programattically.',
    command: '$ robo prod warehouse-tool schemas update-collections -w <warehouse_id> -p <source_id> [-c <collection>] --disable [--dry-run]',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Disable-events%2Ftables'
  },
  '16': {
    option: '16) disable properties from syncing',
    description: 'Disable properties from syncing to a warehouse programattically. (See documentation for more details.)',
    command: '$ robo prod warehouse-tool schemas update -p <source_id> -c <collection> -P <property (regex)> --disable [--dry-run]',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Disable-properties'
  },
  '17': {
    option: '17) enable tables to sync',
    description: 'Enable previously disabled tables to sync to a warehouse.',
    command: '$ robo prod warehouse-tool schemas update-collections -p <project> -c <collection> --enable [--dry-run]',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Enable-events%2Ftables'
  },
  '18': {
    option: '18) enable properties to sync',
    description: 'Enable previously disabled properties to sync to a warehouse.',
    command: '$ robo prod warehouse-tool schemas update -p <source_id> -c <collection> -P <property (regex)> --disable [--dry-run]',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Enable-properties'
  },
  '19': {
    option: '19) customize deduplication window for warehouses (not BigQuery)',
    description: 'Customize the window that Segment will look back for duplicate records.',
    command: '$ robo prod warehouse-tool feature dedupe-window -w <warehouse_id> --window <timeframe>',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Customize-the-de-dupe-window-for-a-Warehouse-(does-NOT-apply-to-BigQuery)'
  },
  '20': {
    option: '20) disable deduplication for a warehouse',
    description: 'Disable a warehouse from looking for and removing duplicates.',
    command: '$ robo prod warehouse-tool feature dedupe-window -w <warehouse_id> --none',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Customize-the-de-dupe-window-for-a-Warehouse-(does-NOT-apply-to-BigQuery)'
  },
  '21': {
    option: '21) change max number of connections for a warehouse',
    description: 'This can be lowered if a customer has many sources and needs Segment to make fewer connections.',
    command: '$ robo prod warehouse-tool feature max-connections -m 2 -w <warehouse_id>',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Change-the-max-connections-for-a-Warehouse'
  },
  '22': {
    option: '22) increase VARCHAR',
    description: 'Increase the number of characters allows in a VARCHAR column type.',
    command: 'See the documentation.',
    documentationLink: 'https://segment.atlassian.net/wiki/spaces/JUNGLEBOOK/pages/338592807/Warehouses+Guide+for+Success+v2#Increase-VARCHAR'
  }
}

const replayToolOptions = {
  '1': {
    option: 'TO BE FILLED IN',
    description: '',
    command: '',
    documentationLink: ''
  }
}

const roboToolOptions = {
  '1': {
    option: '1) update robo',
    description: 'Update the robo tool.',
    command: '$ robo update',
    documentationLink: ''
  }
}

//message indicating tool has closed
rl.on("close", function() {
    console.log(chalk.bgMagenta('\n\nThank you for using the ' + chalk.bold(chalk.underline('Robo Tool Finder')) + '! See you again next time!'));
    process.exit(0);
});
