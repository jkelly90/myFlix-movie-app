const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

//in memory array
let movies = [
  {
    title: 'Lost in Translation',
    year: 2004,
    description: "A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo.",
    genre: "Drama",
    imageURL: "",
    director: {
      name: "Sofia Coppola",
      birthYear: 1971,
      deathYear: "n/a",
      bio: "Sofia Coppola is a film director, screenwriter, producer and actor. She directed The Virgin Suicides and Lost in Translation, winning an Oscar for the latter.",
    }
  },
  {
    title: 'Midnight in Paris',
    year: 2011,
    description: "While on a trip to Paris with his fiancée's family, a nostalgic screenwriter finds himself mysteriously going back to the 1920s everyday at midnight.",
    genre: "Comedy",
    imageURL: "",
    director: {
      name: "Woody Allen",
      birthYear: 1935,
      deathYear: "n/a",
      bio: "Woody Allen is an American comedian, filmmaker and writer who directed and starred in two of his most famous films, 'Annie Hall' and 'Manhattan.'",
    }
  },
  {
    title: 'Wings of Desire',
    year: 1987,
    description: "An angel tires of overseeing human activity and wishes to become human when he falls in love with a mortal.",
    genre: "Drama",
    imageURL: "",
    director: {
      name: "Wim Wenders",
      birthYear: 1945,
      deathYear: "n/a",
      bio: "Ernst Wilhelm Wenders is a German filmmaker, playwright, author, and photographer. He is a major figure in New German Cinema.",
    }
  },
  {
    title: 'Dances with Wolves ',
    year: 1990,
    description: "Lieutenant John Dunbar, assigned to a remote western Civil War outpost, befriends wolves and Indians, making him an intolerable aberration in the military.",
    genre: "Drama",
    imageURL: "",
    director: {
      name: "Kevin Costner",
      birthYear: 1955,
      deathYear: "n/a",
      bio: "Film actor and director Kevin Costner directed and starred in the epic film Dances With Wolves (1990), which won seven Oscars.",
    }
  },
  {
    title: 'Spirited Away',
    year: 2001,
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    genre: "Animation",
    imageURL: "",
    director: {
      name: "Hayao Miyazaki",
      birthYear: 1941,
      deathYear: "n/a",
      bio: "Hayao Miyazaki is a Japanese animator, filmmaker, screenwriter, author, and manga artist. A co-founder of Studio Ghibli.",
    }
  },
  {
    title: 'Coco',
    year: 2017,
    description: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    genre: "Animation",
    imageURL: "",
    director: {
      name: "Lee Unkirch",
      birthYear: 1967,
      deathYear: "n/a",
      bio: "Lee Edward Unkrich is an American director, film editor, screenwriter, and animator. He was a longtime member of the creative team at Pixar, where he started in 1994 as a film editor. ",
    }
  },
  {
    title: 'The Lives of Others',
    year: 2006,
    description: "In 1984 East Berlin, an agent of the secret police, conducting surveillance on a writer and his lover, finds himself becoming increasingly absorbed by their lives.",
    genre: "Drama",
    imageURL: "",
    director: {
      name: "Florian Henckel von Donnersmarck",
      birthYear: 1973,
      deathYear: "n/a",
      bio: "Florian Maria Georg Christian Graf Henckel von Donnersmarck is a German film director, best known for writing and directing the 2006 Oscar-winning dramatic thriller The Lives of Others.",
    }
  },
  {
    title: 'The Hunt',
    year: 2012,
    description: "A teacher lives a lonely life, all the while struggling over his son's custody. His life slowly gets better as he finds love and receives good news from his son, but his new luck is about to be brutally shattered by an innocent little lie.",
    genre: "Drama",
    imageURL: "",
    director: {
      name: "Thomas Vinterberg",
      birthYear: 1969,
      deathYear: "n/a",
      bio: "Thomas Vinterberg is a Danish film director who, along with Lars von Trier, co-founded the Dogme 95 movement in filmmaking, which established rules for simplifying movie production.",
    }
  },
  {
    title: '2001: A Space Odyssey',
    year: 1968,
    description: "After discovering a mysterious artifact buried beneath the Lunar surface, mankind sets off on a quest to find its origins with help from intelligent supercomputer H.A.L. 9000.",
    genre: "Sci-fi",
    imageURL: "",
    director: {
      name: "Stanley Kubrick ",
      birthYear: 1928,
      deathYear: 1999,
      bio: "Stanley Kubrick was an American filmmaker known for directing such acclaimed features as 'Dr. Strangelove,' 'A Clockwork Orange,' '2001: A Space Odyssey,' 'The Shining' and 'Full Metal Jacket.'",
    }
  },
  {
    title: 'Your Name',
    year: 2016,
    description: "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    genre: "Animation",
    imageURL: "",
    director: {
      name: "Makoto Shinkai",
      birthYear: 1973,
      deathYear: "n/a",
      bio: "Makoto Shinkai is a Japanese animator, filmmaker, and manga artist best known for directing Your Name, the highest-grossing anime film of all time at the time of release.",
    }
  }
];

//Gets list of ALL movies
app.get('/movies', function(req, res){
    res.json(movies)
});

//Gets data about a single movie, by Title
app.get("/movies/:title", (req, res) => {
  res.json(movies.find( (movie) =>
    { return movie.title === req.params.title }));
});

//Gets data about a genre
app.get('/genre/:name', (req, res) => {
  res.json(movies.find( (genre) =>
  { return genre.name === req.params.genre; }));
});




app.get('/', function(req, res){
    res.send('Welcome to my movie app!')
});


app.use(express.static('public'));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(8080, () => {
    console.log(`Your app is listening on port 8080`);
  });
