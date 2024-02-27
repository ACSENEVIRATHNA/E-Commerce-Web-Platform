require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/User");
const productRouter = require("./routes/Product");
const publicRouter = require("./routes/Public");
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to MongoDB and listening on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/public",publicRouter);