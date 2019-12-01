import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './main-view.scss';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        //call superclass constructor so react can initialize it
        super();

        //initialize the state to an empty object so can be destructured later
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null
        };
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

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    render() {
        //if the state isn't initialized, this will throw on runtime before data is initially loaded
        const { movies, selectedMovie, user } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        //before moves have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                <Container>

                    <Row>
                        {selectedMovie
                            ? <MovieView movie={selectedMovie} />
                            : movies.map(movie => (
                                <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                            ))
                        }
                    </Row>
                </Container>
            </div >
        )
    }
}

/*MainView.propTypes = {
    movie: PropTypes.shape({
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