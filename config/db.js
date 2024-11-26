const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`Connection to mongo: ${conn.connection.host}`);
};

mongoose.set("strictQuery", true);

module.exports = connectDB;
