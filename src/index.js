var express = require("express");
var router = require("./routes/index");

const app = express();

const PORT = 4000;

app.use(express.json());
router(app);

app.listen(PORT, () => console.log("Server is running at PORT: " + PORT));
