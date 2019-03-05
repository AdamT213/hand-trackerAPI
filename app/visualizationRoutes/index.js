const _ = require("lodash");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("cookie-session");
const knex = require("knex");
const flash = require("connect-flash");
const ENV = process.env.NODE_ENV || "development";

const config = require("../knexfile");
const db = knex(config[ENV]);

// Initialize Express.
const app = express();
var router = express.Router(); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({ secret: "some secret" }));
app.use(flash());
app.use(cookieParser());
app.use("/api", router); 
router.use(cors());

// Configure & Initialize Bookshelf & Knex.
console.log(`Running in environment: ${ENV}`);

// ***** Server ***** //

const last30Days = require("./last30DaySessionData"); 

router.get("/last30Days", (req, res) => {
    var data = last30Days();
    console.log(`data: ${data}`);
	if (data)
		res.json(data);
})
.catch((error) => {
    console.error(error);
    return res.sendStatus(500);
});
