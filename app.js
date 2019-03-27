const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
app.use("/api/users", users);
app.use("/api/tweets", tweets);


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) =>  {
  debugger
  res.send("Nice!")
});


app.listen(port, () => console.log(`SUCCESS: Server running on port ${port}`));

