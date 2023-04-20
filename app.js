const { inquirerMenu, pausa } = require("./helpers/inquirer");
require("colours");

console.clear();

const main = async () => {
  console.log("hola mundo");

  let opt = "";

  do {
    opt = await inquirerMenu();
    console.log({ opt });

    await pausa();
  } while (opt !== "0");
};

main();
