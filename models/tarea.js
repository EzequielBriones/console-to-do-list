const { v4: uuidv4 } = require("uuid");

// This creates a new tasks based with this parameters and an ID created by uuid.
class Tarea {
  id = "";
  desc = "";
  completadoEn = null;

  constructor(desc) {
    this.id = uuidv4();
    this.desc = desc;
    this.completadoEn = null;
  }
}

module.exports = Tarea;
