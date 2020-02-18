import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './genre-view.scss';

import { Link } from 'react-router-dom';

export class GenreView extends React.Component {
    constructor() {
        super();

        this.state = {}
    }

    render() {
        const { genre } = this.props;

        if (!genre) return null;

        return (
            <Card className="genre">
                <Card.Body>
                    <Card.Title className="genre-name">{genre.Name}</Card.Title>
                    <Card.Text>
                        Description: <br />
                        {genre.Description}
                    </Card.Text>
                    <Link to={'/'}>
                        <Button className="button" variant="info">Back</Button>
                    </Link>
                </Card.Body>
            </Card>

        );
    }
}