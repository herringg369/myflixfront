import axios from 'axios'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

export function RegistrationView(props) {

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')
    const [birthday, setBirthday ] = useState('')

    const handleRegistration = (e) => {
    e.preventDefault();
    axios.post('https://herringg369movieapi.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert(data)
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
        alert('error registering the user')
      });
    }

        return (
            <Form>
            <h2>Create Account</h2>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
              </Form.Group>
        
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
              </Form.Group>
    
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
              </Form.Group>
    
              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="birthday" onChange={e => setBirthday(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleRegistration}>
                Create Account
              </Button>

            <Link to={'/'}>
                <Button>Login View</Button>
            </Link>
            </Form>
        )

}