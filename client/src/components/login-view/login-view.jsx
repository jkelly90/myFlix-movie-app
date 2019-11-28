import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Containter from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';


export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        e, preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    };


    return (
        <Container>
            <Form className="login-form">
                <Form.Group contolId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} placeholder="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button className="btn-submit" variant="info" type="submit" onClick={handleSubmit}>Log in</Button>
            </Form>
        </Container>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};