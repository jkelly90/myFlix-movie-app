import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';


export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    const handleSubmit = () => {
        e, preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    }

    axios.post('https://my-flix-movies.herokuapp.com/users', {
        username: username,
        password: password,
        email: email,
        birthday: birthday
    })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self');
        })
        .catch(e => {
            console.log('error registering the user')
        });

    return (
        <Form className="registration-form">
            <Form.Group controlId="formNewUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Your username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Your email" value={username} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="text" placeholder="Your birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Button className="btn-submit" variant="info" type="submit" onClick={handleSubmit}>Register</Button>
        </Form>
    )
};