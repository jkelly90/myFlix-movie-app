const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Models = require('./models.js');
const uuid = require("uuid");
const { check, validationResult } = require('express-validator');

const Movies = Models.Movie;
const Users = Models.User;
const passport = require('passport');
require('./passport');

//mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

mongoose.connect('mongodb+srv://jkelly:4GxiKMMYlDvMozFx@myflixdb-vliwy.mongodb.net/myFlixDB?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(morgan('common'));

let auth = require('./auth')(app);

const cors = require('cors');
app.use(cors());

var allowedOrigins = ['http://localhost:8080', 'http://localhost:3000', 'http://testsite.com', "http://localhost:1234"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var message = 'The CORS policy for this application does not allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

//Welcome message
app.get("/", (req, res) => {
  res.send('Welcome to my movie app!')
});

//Gets list of ALL movies
app.get("/movies", (req, res) => {
  Movies.find()
    .then(function (movies) {
      res.status(201).json(movies)
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error" + err);
    });
});

//Gets data about a single movie, by Title
app.get("/movies/:Title", passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find({ Title: req.params.Title })
    .then(function (movies) {
      res.status(201).json(movies)
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error" + err);
    });
});

//Gets data about a genre
app.get("/movies/genres/:Name", passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find({ "Genre.Name": req.params.Name })
    .then(function (movies) {
      res.json(movies)
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error" + err);
    });
});

//Gets data about a director
app.get("/movies/director/:Name", passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find({ "Director.Name": req.params.Name })
    .then(function (movies) {
      res.json(movies)
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error" + err);
    });
});

//Add a new user
app.post("/users",
  [
    check("username", "username is required").isLength({ min: 5 }),
    check("username", "username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
    check("password", "password is required").not().isEmpty(),
    check("email", "email does not appear to be valid").isEmail()
  ], (req, res) => {

    //check validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.password);

    Users.findOne({ username: req.body.username })
      .then(function (user) {
        if (user) {
          return res.status(400).send(req.body.username + "already exists");
        } else {
          Users
            .create({
              username: req.body.username,
              password: hashedPassword,
              email: req.body.email,
              birthday: req.body.birthday
            })
            .then(function (user) { res.status(201).json(user) })
            .catch(function (error) {
              console.error(error);
              res.status(500).send("Error: " + error);
            })
        }
      }).catch(function (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  });

//Update users by ID
app.put("/users/:Username", passport.authenticate('jwt', { session: false }),
  [
    check("username", "username is required").isLength({ min: 5 }),
    check("username", "username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
    check("password", "password is required").not().isEmpty(),
    check("email", "email does not appear to be valid").isEmail()
  ], (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.password);

    Users.findOneAndUpdate({ username: req.params.username }, {
      $set:
      {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday
      }
    },
      { new: true },
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser)
        }
      })
  })

//Add movie to user's list of favourites
app.post("/users/:Username/Movies/:MovieID", passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username }, {
    $push: { Favorites: req.params.MovieID }
  },
    { new: true },
    function (error, updatedUser) {
      if (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      } else {
        res.json(updatedUser);
      }
    })
});

//Remove a movie from user's list of favourites
app.delete("/users/:Username/Movies/:MovieID", passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username }, {
    $pull: { Favorites: req.params.MovieID }
  },
    { new: true },
    function (error, updatedUser) {
      if (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      } else {
        res.json("Movie " + req.params.MovieID + " was removed from favorites");
      }
    })
});

//Remove a user using ID
app.delete("/users/:Username", passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then(function (user) {
      if (!user) {
        res.status(400).send(req.params.username + " was not found");
      } else {
        res.status(200).send(req.params.username + " was deleted.");
      }
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.use(express.static('public'));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

let port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
  console.log("Listening on port 3000");
});