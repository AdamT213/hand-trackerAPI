/* eslint-disable no-console */
const _ = require("lodash");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("cookie-session");
const knex = require("knex");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", router); 
router.use(cors());

// Configure & Initialize Bookshelf & Knex.
console.log(`Running in environment: ${ENV}`);

// ***** Models ***** //

const Hand = require("./models/hand");
const Session = require("./models/session");
const Table = require("./models/table");
const Tag = require("./models/tag"); 
const Hands_Tag = require("./models/hands_tag");
const Sessions_Tag = require("./models/sessions_tag"); 
const Tables_Tag = require("./models/tables_tag"); 
/// ***** Passport Strategies & Helpers ***** //


// ***** Server ***** //


router.get("/hands", (req, res) => {
	Hand
		.collection()
		.fetch({withRelated: ["sessions", "tables","hands_tags"]})
		.then((hands) => {
			res.json(hands);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
});

router.get("/hand/:id", (req,res) => {
	Hand
		.forge({id: req.params.id})
		.fetch({withRelated: ["sessions", "tables", "hands_tags"]})
		.then((hand) => {
			if (_.isEmpty(hand))
				return res.sendStatus(404);
			res.json(hand);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
});

router.post("/hands", (req, res) => {
	if(_.isEmpty(req.body))
		return res.sendStatus(400);
	Hand
		.forge(req.body)
		.save()
		.then((hand) => {
			res.json({hand});
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
});

router.get("/sessions", (req, res) => {
	Session
		.collection()
		.fetch({withRelated: ["tables", "sessions_tags"]})
		.then((sessions) => {
			res.json(sessions);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
}); 

router.delete("/session/:id", function (req, res) {
	Session
	  .forge({id: req.params.id})
	  .fetch({require: true})
	  .then((session) => {
			session.destroy()
				.then(function () {
		  res.json({error: true, data: {message: "Session successfully deleted"}});
				})
				.catch(function (err) { 
		  console.log(err.message);
		  res.status(500).json({error: true, data: {message: err.message}});
				});
	  });
}); 

router.get("/session/:id", (req,res) => {
	Session
		.forge({id: req.params.id})
		.fetch({withRelated: ["tables", "tables.tables_tags", "sessions_tags"]})
		.then((session) => {
			if (_.isEmpty(session))
				return res.sendStatus(404);
			res.json(session);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
});

router.patch("/session/:id", (req,res) => {    
	Session
		.forge({id: req.params.id})
		.fetch({withRelated: "tables"})
		.then((session) => {  
			let amount = 0.0;
			if (session.relations.tables) {
				session.relations.tables.forEach(table => {
					if (!table.attributes.isTermed)  {
						throw new Error("1 or more open tables in session. Please leave all open tables.");
					} 
					amount += table.attributes.amount;
				}); 
			} 
			// to get duration: get current time via Date.getTime, 
			// and convert created at timestamp to date.getTime format. 
			// Then subtract and divide by number of milliseconds in a minute
			return session.save({
				duration: parseInt((new Date().getTime() - 
				new Date(session.attributes.created_at.toString().replace(/-/g,"/")).getTime())/60000),
				isTermed: true, 
				amount: amount, 
				status: (amount >= 0)
			});
		})
		.then((session) => {
			res.json(session);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500).body(error);
		});
});

router.post("/sessions", (req, res) => {
	Session
		.forge()
		.save()
		.then((session) => {
			res.json({session});
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
});

router.get("/tables", (req, res) => {
	Table
		.collection()
		.fetch({withRelated: ["hands", "tables_tags"]})
		.then((tables) => {
			res.json(tables);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
});

router.get("/table/:id", (req,res) => {
	Table
		.forge({id: req.params.id})
		.fetch({withRelated: ["session", "hands", "hands.hands_tags", "tables_tags"]})
		.then((table) => {
			if (_.isEmpty(table))
				return res.sendStatus(404);
			res.json(table);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
}); 

router.patch("/table/:id", (req,res) => {
	let amount = 0.0; 
	Table
		.forge({id: req.params.id}) 
		.fetch({withRelated: "hands"})
		.then(table => {
			table.relations.hands.forEach(hand => {
				if (hand.attributes.status) { 
					amount += hand.attributes.potSize - hand.attributes.money_invested;
				}
				else {
					amount -= hand.attributes.money_invested;
				} 
			});
			return  table.save({
				isTermed: true, 
				amount: amount
			});
		})
		.then((table) => { 
			console.log(table);
			res.json(table);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500).body(error);
		});
});

router.post("/tables", (req, res) => {
	if(_.isEmpty(req.body))
		return res.sendStatus(400);
	Table
		.forge(req.body)
		.save()
		.then((table) => {
			res.json({table});
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
});

router.get("/tags", (req, res) => {
	Tag
		.collection()
		.fetch({withRelated: ["sessions_tags", "hands_tags", "tables_tags"]})
		.then((tags) => {
			res.json(tags);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
});

router.get("/tag/:id", (req,res) => {
	Tag
		.forge({id: req.params.id})
		.fetch({withRelated: ["sessions_tags", "hands_tags", "tables_tags"]})
		.then((tag) => {
			if (_.isEmpty(tag))
				return res.sendStatus(404);
			res.json(tag);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
});

router.post("/tags", async (req, res) => {
	if(_.isEmpty(req.body) || req.body.name === "")
		return res.sendStatus(400);
	var tag = await Tag.query('where', 'name', '=', req.body.name).fetch();
	if(tag) {
		console.log(`Found tag: ${{name: tag.name, id: tag.id}}`);
		return res.json(tag);
	}
	Tag
		.forge(req.body)
		.save()
		.then((tag) => {
			console.log(`Created tag: ${tag}`);
			res.json(tag);
		})
	.catch((error) => {
		console.error(error);
		return res.sendStatus(500);
	});
}); 

router.get("/hands_tags", (req, res) => {
	Hands_Tag
		.collection()
		.fetch({withRelated: ["hands", "tags"]})
		.then((hands_tags) => {
			res.json(hands_tags);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
});

router.post("/hands_tags", (req, res) => {
	if(_.isEmpty(req.body))
		return res.sendStatus(400);
	Hands_Tag
		.forge(req.body)
		.save()
		.then((hand_tag) => {
			res.json(hand_tag);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
}); 

router.get("/sessions_tags", (req, res) => {
	Sessions_Tag
		.collection()
		.fetch({withRelated: ["sessions", "tags"]})
		.then((sessions_tags) => {
			res.json(sessions_tags);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
});

router.post("/sessions_tags", (req, res) => {
	if(_.isEmpty(req.body))
		return res.sendStatus(400);
	Sessions_Tag
		.forge(req.body)
		.save()
		.then((session_tag) => {
			res.json("Successfully Created");
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
}); 

router.get("/tables_tags", (req, res) => {
	Tables_Tag
		.collection()
		.fetch({withRelated: ["tables", "tags"]})
		.then((tables_tags) => {
			res.json(tables_tags);
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
});

router.post("/tables_tags", (req, res) => {
	if(_.isEmpty(req.body))
		return res.sendStatus(400);
	Tables_Tag
		.forge(req.body)
		.save()
		.then((table_tag) => {
			res.json("Successfully Created");
		})
		.catch((error) => {
			console.error(error);
			return res.sendStatus(500);
		});
}); 

// Exports for Server Hoisting.

const listen = (port) => {
	return new Promise((resolve, reject) => {
		return resolve(app.listen(port));
	});
};

exports.up = (justBackend) => {
	return db.migrate.latest([ENV])
		.then(() => {
			return db.migrate.currentVersion();
		})
		.then((val) => {
			console.log("Done running latest migration:", val);
			return listen(process.env.PORT || 3000);
		})
		.then((server) => {
			console.log(`Listening on port ${process.env.PORT || 3000}...`);
			return server;
		});
};

// ***** Visualization Routes(will eventually go in own file)***** //

const last30Days = require("./visualizationRoutes/last30DaySessionData"); 

router.get("/last30Days", (req, res) => {
    var data = last30Days();
    console.log(`data: ${data}`);
	try {
		res.json(data);
	} 
	catch(error) { 
		console.error(error);
		return res.sendStatus(500)
	}
})
