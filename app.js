// Requires the inquirer functions, tasks and colours
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require("./helpers/inquirer");
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
      case "1": // Create new task
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;

      case "2": // List all tasks
        tareas.listadoCompleto();
        break;
      case "3": // Show completed tasks
        console.log("Aca van las tareas completadas");
        tareas.listarPendientesCompletadas();
        break;
      case "4": // Show pending tasks
        console.log("Aca van las tareas pendientes");
        tareas.listarPendientesCompletadas(false);
        break;
      case "5": // Complete tasks
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        console.log(ids);

        break;
      case "6": // Delete tasks
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("Seguro maquina?".red);

          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada".green);
          } else {
            console.log("La tarea no se borró".yellow);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");

  console.clear();
};

main();
