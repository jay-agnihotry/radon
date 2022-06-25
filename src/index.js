const express = require("express");
const bodyParser = require("body-parser");
const route = require("./router/route.js");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://NishantGautam:Ng123@cluster0.45vj3.mongodb.net/NishantGautam-DB",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Hello Nishant! MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
