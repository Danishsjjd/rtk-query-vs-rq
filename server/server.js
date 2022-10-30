const express = require("express");

const config = require("./startup/config");
const connection = require("./startup/db");
const middleware = require("./startup/middleware");

const app = express();

config();
middleware(app);
connection();

app.listen(9001);
