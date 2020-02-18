import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './director-view.scss';

import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {

    constructor() {
        super();

        this.state = {}
    }

    render() {
        const { director } = this.props;

        if (!director) return null;

        return (
            <Card className="director">
                <Card.Body>
                    <Card.Title className="director-name">{director.Name}</Card.Title>
                    <Card.Text>
                        Description: <br />
                        {director.Description}
                    </Card.Text>
                    <Link to={'/'}>
                        <Button className="button" variant="info">Back</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}