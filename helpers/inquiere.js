const inquirer = require('inquirer');
require('colors');

const question = [
  {
    type: 'list',
    name: 'options',
    message: "What do you want to do?",
    choices: [
      {
        value: `1`,
        name: `${'1'.green}. Create a task`
      },
      {
        value: '2',
        name: `${'2'.green}. List tasks`
      },
      {
        value: '3',
        name: `${'3'.green}. List completed tasks`
      },
      {
        value: '4',
        name: `${'4'.green}. List to-do`
      },
      {
        value: '5',
        name: `${'5'.green}. Complete tasks`
      },
      {
        value: '6',
        name: `${'6'.green}. Delete tasks`
      },
      {
        value: '0',
        name: `${'0'.green}. Get out `
      },
    ]
  }
];

const inquirerMenu = async() =>{

  console.clear();
  console.log('========================='.green  );
  console.log('  Select an option'     .white    );
  console.log('=========================\n'.green);
  
  const {options} = await inquirer.prompt(question);

  return options
}


const pause = async() =>{

  const question = [
    {
      type: 'input',
      name: 'enter',
      message:  `\nPress ${'enter'.green} to continue \n`,
    }
  ]

  console.log('\n')
  await inquirer.prompt(question);
}

//this function receives a message , which is the description of the task we want to save
const readInput = async(message) =>{
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      
      validate(value){
        if(value.length === 0 ){
          return 'Please enter a value';
        }
        return true;
      }
    }
  ];

  const {desc} = await inquirer.prompt(question);
  return desc;
}

//we list the tasks we want to delete
const listTasksClear = async(tasks = []) => {

  const choices = tasks.map((task, i) =>{
    const idx = `${i + 1}.`.green

    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    }
  });

  choices.unshift({
    value: '0',
    name: '0. '. green + 'Cancel'
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices,
    }
  ];

  const {id} = await inquirer.prompt(questions);
  return id;
}


//confirmation window to delete a task  
const confirm = async (message)=> {

  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    }
  ];

  const {ok} = await inquirer.prompt(question);
  return ok;

}

const showListChecklist = async(tasks = []) => {

  const choices = tasks.map((task, i) =>{
    const idx = `${i + 1}.`.green

    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: (task.completedIn) ? true : false
    }
  });

  //we create the questions that are asked of the user 
  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione ',
      choices,
    }
  ];

  const {ids} = await inquirer.prompt(pregunta);
  return ids;
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listTasksClear,
  confirm,
  showListChecklist
}