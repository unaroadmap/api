const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require('./database');

const app = express();

app.use(cors({
    origin: '*',
    allowHeaders: ['Origin, Content-Type, Accept, Authorization'],
    exposeHeaders: ['Access-Control-Expose-Headers','X-Total-Count'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(require("./routes"));

app.listen(process.env.PORT || 3000);