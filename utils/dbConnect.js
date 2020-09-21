/* This is a database connection function*/
import mongoose from "mongoose";
console.log("mongoose load page -----");

const connection = {}; /* creating connection object*/

async function dbConnect() {
  console.log("in db connect page -----");
  /* check if we have connection to our database*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
