const mongoose = require("mongoose");

const database =(process.env.database_connection)


mongoose
  .connect(database, {})
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = database;
