import React from 'react';
import axios from 'axios';

export class MainView extends React.Component {
    constructor() {
        //call superclass constructor so reac can initialize it
        super();

        //initialize the state to an empty object so can be destructured later
        this.state = {};
    }

    componentDidMount() {
        axios.get('https://my-flix-movies.herokuapp.com/movies')
            .then(response => {
                //assign the result to the state
                this.setState({
                    movies: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //this overrides the render() method of the superclass
    render() {
        //if the state isn't initialized, this will throw on runtime before data is initially loaded
        const { movies } = this.state;

        //before moves have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                {movies.map(movie => (
                    <div className="movie-card" key={movie._id}>{movie.Title}</div>
                ))}
            </div>
        );
    }
}