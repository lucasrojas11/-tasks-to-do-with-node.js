require('colors')

const showMenu = () =>{

  return new Promise(resolve =>{

    console.clear();
    console.log('========================='.green);
    console.log('    Select an option     '.green);
    console.log('=========================\n'.green);


    console.log(`${'1.'.green} Create a task`);
    console.log(`${'2.'.green} List tasks`);
    console.log(`${'3.'.green} List completed tasks`);
    console.log(`${'4.'.green} List to-do`);
    console.log(`${'5.'.green} Complete tasks`);
    console.log(`${'6.'.green} Delete tasks`);
    console.log(`${'0.'.green} Get out \n`);


    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question( 'Select an option: ', (opt)=>{
      readline.close();
      resolve(opt);
    });
  });
};

const pause = () => { 

  return new Promise(resolve => {
    
    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    readLine.question( `\nPress ${'ENTER'.green} to continue \n`, (opt)=>{
      readLine.close();
      resolve();
    })
    
  });
}


module.exports = {
  mostrarMenu: showMenu,
  pausa: pause
}