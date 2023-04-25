const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  // This makes our tasks list from an object list to an array.
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  // This function deletes the task that arrived via ID.
  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  // This gets all the tasks and shows them.
  cargarTareasFromArr(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  // Uses the tarea object to create a new task from tarea.js
  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  // Shows the full list of tasks. including if they were completed or not.
  listadoCompleto() {
    const tareas = this.listadoArr;

    tareas.forEach((tarea, i) => {
      const idx = `${i + 1}`;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      console.log(`${(idx + ".").green} ${desc} :: ${estado}`);
    });
  }

  // Shows the completed (or not completed) tasks based on what you option you choose.
  listarPendientesCompletadas(completadas = true) {
    const tareas = this.listadoArr;
    let contador = 0;

    tareas.forEach((tarea, i) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      if (completadas) {
        // shows complete tasks
        if (completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${completadoEn.green}`);
        }
      } else {
        // shows pending tasks
        if (!completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
        }
      }
    });
  }

  // Allows to toggle the completed and pending tasks.
  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
