if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const cors = require("cors");

const express = require("express");
const app = express();

const port = process.env.PORT || 10000;

app.use(cors);
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Application is working at port ${port}`));
