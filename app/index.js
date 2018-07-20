const _ = require('lodash');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const knex = require('knex');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const ENV = process.env.NODE_ENV || 'development';

const config = require('../knexfile');
const db = knex(config[ENV]);

// Initialize Express.
const app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({ secret: 'some secret' }));
app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', router);

// Configure & Initialize Bookshelf & Knex.
console.log(`Running in environment: ${ENV}`);

// ***** Models ***** //

const Hand = require('./models/hand');
const Session = require('./models/session');
const Table = require('./models/table');
const Tag = require('./models/tag');
/// ***** Passport Strategies & Helpers ***** //


// ***** Server ***** //


router.get('/hands', (req, res) => {
  Hand
    .collection()
    .fetch()
    .then((hands) => {
      res.json(hands);
    })
    .catch((error) => {
      console.error(error);
      return res.sendStatus(500);
    });
});

router.get('/hand/:id', (req,res) => {
  Hand
    .forge({id: req.params.id})
    .fetch({withRelated: ['session', 'table']})
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

router.post('/hands', (req, res) => {
  if(_.isEmpty(req.body))
    return res.sendStatus(400);
  Hand
    .forge(req.body)
    .save()
    .then((hand) => {
      res.json({id: hand.id});
    })
    .catch((error) => {
      console.error(error);
      return res.sendStatus(500);
    });
});

router.get('/sessions', (req, res) => {
  Session
    .collection()
    .fetch()
    .then((sessions) => {
      res.json(sessions);
    })
    .catch((error) => {
      console.error(error);
      return res.sendStatus(500);
    });
});

router.get('/session/:id', (req,res) => {
  Session
    .forge({id: req.params.id})
    .fetch({withRelated: ['tables', 'hands']})
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

router.post('/sessions', (req, res) => {
  if(_.isEmpty(req.body))
    return res.sendStatus(400);
  Session
    .forge(req.body)
    .save()
    .then((session) => {
      res.json({id: session.id});
    })
    .catch((error) => {
      console.error(error);
      return res.sendStatus(500);
    });
});

router.get('/tables', (req, res) => {
  Table
    .collection()
    .fetch()
    .then((tables) => {
      res.json(tables);
    })
    .catch((error) => {
      console.error(error);
      return res.sendStatus(500);
    });
});

router.get('/table/:id', (req,res) => {
  Table
    .forge({id: req.params.id})
    .fetch({withRelated: ['session', 'hands']})
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

router.post('/tables', (req, res) => {
  if(_.isEmpty(req.body))
    return res.sendStatus(400);
  Table
    .forge(req.body)
    .save()
    .then((table) => {
      res.json({id: table.id});
    })
    .catch((error) => {
      console.error(error);
      return res.sendStatus(500);
    });
});

router.get('/tags', (req, res) => {
  Tag
    .collection()
    .fetch()
    .then((tags) => {
      res.json(tags);
    })
    .catch((error) => {
      console.error(error);
      return res.sendStatus(500);
    });
});

router.get('/tag/:id', (req,res) => {
  Tag
    .forge({id: req.params.id})
    .fetch({withRelated: ['sessions', 'hands', 'tables']})
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

router.post('/tags', (req, res) => {
  if(_.isEmpty(req.body))
    return res.sendStatus(400);
  Tag
    .forge(req.body)
    .save()
    .then((tag) => {
      res.json({id: tag.id});
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
      console.log('Done running latest migration:', val);
      return listen(3000);
    })
    .then((server) => {
      console.log('Listening on port 3000...');
      return server
    });
};