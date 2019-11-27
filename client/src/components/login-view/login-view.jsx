import React, { useState } from 'react';

//import Row from 'react-bootstrap/Row;'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        e, preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    };


    return (
        <form>
            <label>
                Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
    );
}