const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

//json object
let topMovies = [ {
    title: 'Lost in Translation',
    director: 'Sofia Coppola'
},
{
    title: 'Midnight in Paris',
    director: 'Woody Allen'
},
{
    title: 'Wings of Desire',
    director: 'Wim Wenders'
},
{
    title: 'Dances with Wolves ',
    director: 'Kevin Costner'
},
{
    title: 'Spirited Away',
    director: 'Hayao Miyazaki'
},
{
    title: 'Coco',
    director: 'Lee Unkirch'
},
{
    title: 'The Lives of Others',
    director: 'Florian Henckel von Donnersmarck'
},
{
    title: 'The Hunt',
    director: 'Thomas Vinterberg'
},
{
    title: '2001: A Space Odyssey',
    director: 'Stanley Kubrick'
},
{
    title: 'Your Name',
    director: 'Makoto Shinkai'
}
]

//GET requests
app.get('/movies', function(req, res){
    res.json(topMovies)
}); 

app.get('/', function(req, res){
    res.send('Welcome to my movie app!')
});


app.use(express.static('public'));

app.listen(8080);

