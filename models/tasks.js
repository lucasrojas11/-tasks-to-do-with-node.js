const Task = require('./task');

class Tasks {
  _list = {};

  get listArr(){
    const list = [];

    Object.keys(this._list).forEach(key => {
        const task = this._list[key];
        list.push(task);
    });
    return list;
  }

  constructor(){
    this._list = {};
  }

  deleteTask(id = ''){
    if(this._list[id]){
      delete this._list[id];
    }
  }

  loadTasksFromArray(tasks = []){
    tasks.forEach(task =>{
      this._list[task.id] = task;
    });
  };

  createTask(desc = ''){
    const task = new Task(desc);

    this._list[task.id] = task; 
  }

  //list all tasks 
  completedList(){

    console.log('\n');

    this.listArr.forEach( (task, i) =>{
      const idx = `${i + 1}`.green;
      const { desc, completedIn } = task;
      const state = (completedIn)
                          ? 'Completed'.green
                          :'Incomplete'.red;
      console.log(`${idx} ${desc} :: ${state}`);
    }); 
  }

  //we list both to-do and completed tasks
  listPendingCompleted(completed = true){

    console.log('\n');

    let cont = 0;
    this.listArr.forEach( task =>{
    
      const { desc, completedIn } = task;
      const state = (completedIn)
                          ? 'Completed'.green
                          :'Incomplete'.red;

      if(completed){
        if(completedIn){
          cont += 1;
          console.log(`${cont.toString().green}${'.'.green} ${desc} :: ${completedIn.green}`);
        }
      }else{
        if(!completedIn){
          cont += 1;
          console.log(`${cont.toString().green}${'.'.green} ${desc} :: ${state}`);
        }
      }
    })
  }


  toggleCompleted( ids = []){
    ids.forEach(id => {

      const task = this._list[id];
      if(!task.completedIn){
        task.completedIn = new Date().toISOString();
      }
    });

    this.listArr.forEach(task => {

      if(!ids.includes(task.id)){
        this._list[task.id].completedIn = null;
      }
    })
  }
}

module.exports = Tasks;