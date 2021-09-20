require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const authRouter = require("./routers/auth");
const postRouter = require("./routers/posts");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern.in1cy.mongodb.net/mern?retryWrites=true&w=majority`,
      {
        // useCreateIndex: true,
        // useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

connectDB();
const port = 5050;
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
