const fs = require("fs");
const archivo = "./db/data.json";

// Writes a file.json with all the information from the tasks that it got from the list
const guardarDB = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};

// If there is any data in the json file, it encodes it and parses it so its readable for the user.
const leerDB = () => {
  if (!fs.existsSync(archivo)) {
    return null;
  }

  const info = fs.readFileSync(archivo, { encoding: "utf-8" });
  const data = JSON.parse(info);

  return data;
};

module.exports = { guardarDB, leerDB };
