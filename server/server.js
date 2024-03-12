const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const { mysqlConnectionHelper } = require("./helpers");

dotenv.config();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
let PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.send("Welcome pharmacy-controller!!!!");
});

const mainRoutes = require("./routes/index.js");
app.use("/api/v1", mainRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
