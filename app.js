require('colors');

const { saveDB, readDB } = require('./helpers/saveFile');
const { inquirerMenu,
        pause,
        readInput,
        listTasksClear,
        confirm,
        showListChecklist
} = require('./helpers/inquiere');
const Tasks = require('./models/tasks');

console.clear();

//principal function 
const main = async () =>{
  console.log('Starting');

  let opt = '';
  
  const tasks = new Tasks();

  const tasksDB = readDB();

  if(tasksDB){
    tasks.loadTasksFromArray(tasksDB);
  }


  do{
    opt = await inquirerMenu();
  
    switch (opt) {
      //If the user chose option 1 we create a task
      case '1':
        const desc = await readInput('Description:');
        //a new task is created with its description 
        tasks.createTask(desc);
        break;

      //list options
      case '2':
        tasks.completedList();
        break;
      
      //list completed tasks
      case '3':
        tasks.listPendingCompleted(true);
        break;

      //list incomplete tasks
      case '4':
        tasks.listPendingCompleted(false);
        break;
        
      //tasks to complete
      case '5': 
        const ids = await showListChecklist(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;

      //delete tasks 
      case '6':
        const id = await listTasksClear(tasks.listArr);
        if(id !== '0'){
          const ok = await confirm("Are you sure?"); 
          if( ok ){
            tasks.deleteTask(id);
            console.log('Task deleted');
          }
        }
        break;
    }

  saveDB(tasks.listArr);

    await pause();

  } while(opt !== '0');
}


main();