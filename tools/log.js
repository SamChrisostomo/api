const fs = require("node:fs");
const path = require("node:path");

exports.logRegister = (message) => {
  const log = path.join(__dirname, "erros.log");
  fs.appendFileSync(log, `${new Date()}: ${message}\n`);
}