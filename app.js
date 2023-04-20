// Requires the inquirer functions, tasks and colours
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
require("colours");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArr(tareasDB);
  }

  do {
    // Prints the tasks menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        console.log("Aca van las tareas completadas");
        tareas.listarPendientesCompletadas();
        break;
      case "4":
        console.log("Aca van las tareas pendientes");
        tareas.listarPendientesCompletadas(false);
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");

  console.clear();
};

main();
