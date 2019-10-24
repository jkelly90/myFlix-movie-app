const express = require('express');
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const morgan = require('morgan');

const app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

app.use(bodyParser.json());


app.use(morgan('common'));


//Welcome message
app.get("/", (req, res) => {
    res.send('Welcome to my movie app!')
});


//Gets list of ALL movies
app.get("/movies", (req, res) => {
    res.json(movies)
});

//Gets data about a single movie, by Title
app.get("/movies/:title", (req, res) => {
    res.json(movies.find( (movie) =>
    { return movie.title === req.params.title }));
});

//Gets data about a genre
app.get("/genres/:name", (req, res) => {
    res.send("Succesful request returning data about a genre")
});

//Gets data about a director
app.get("/directors/:name", (req, res) => {
    res.send("Succesful request returning data about a director");
});

//Add a new user
app.post("/users", (req, res) => {
    res.send("User was added to registry");
});

//Update users by ID
app.put("/users/:id", (req, res) => {
    res.send("User information was updated");
});

//Add movie to user's list of favourites
app.post("/users/:id/:movie-id", (req, res) => {
    res.send("The movie was successfully added to favourites")
});

//Remove a movie from user's list of favourites
app.delete("/users/:id/:movie-id", (req, res) => {
    res.send("The movie was succesfully removed from favourites")
});

//Remove a user using ID
app.delete("/users/:id", (req, res) => {
    res.send("The user was removed from the registry")
});


app.use(express.static('public'));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(8080, () => {
    console.log(`Your app is listening on port 8080`);
  });
