import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './main-view.scss';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {
    constructor() {
        //call superclass constructor so react can initialize it
        super();

        //initialize the state to an empty object so can be destructured later
        this.state = {
            movies: [],
            user: null
        };
    }

    getMovies(token) {
        axios.get('https://my-flix-movies.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                //assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    /*onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }*/

    render() {
        //if the state isn't initialized, this will throw on runtime before data is initially loaded
        const { movies, user } = this.state;



        //before moves have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <Router>
                <div className="main-view">
                    <Route exact path="/" render={() => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        return movies.map(m => <MovieCard key={m._id} movie={m} />)
                    }
                    } />
                    <Route path="/register" render={() => <RegistrationView />} />
                    <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
                    <Route path="/genres/:name" render={({ match }) => {
                        if (!movies) return <div className="main-view" />;
                        return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                    }
                    } />
                    <Route path="/directors/:name" render={({ match }) => {
                        if (!movies) return <div className="main-view" />;
                        return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                    }
                    } />
                </div>
            </Router>
        );
    }
}

/*MainView.propTypes = {
    movies: PropTypes.shape({
        Title: PropTypes.string,
        ImageUrl: PropTypes.string,
        Description: PropTypes.string,
        Genre: PropTypes.exact({
            _id: PropTypes.string,
            Name: PropTypes.string,
            Description: PropTypes.string
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string
        })
    }).isRequired
};*/