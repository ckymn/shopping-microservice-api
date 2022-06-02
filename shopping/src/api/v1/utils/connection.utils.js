const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(
      `MongoDb connected name : ${connect.connection.name} on ${connect.connection.port} port`
    );
  } catch (error) {
    console.log("DB DEFAULT ERROR : ", error);
    process.exit(1); // kill program
  }
};
