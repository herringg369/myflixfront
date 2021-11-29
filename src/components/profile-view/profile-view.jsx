import React from 'react';
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import './profile-view.scss'

export class ProfileView extends React.Component {
  
  constructor() {
    super()

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
      this.getUser(accessToken);
    }
  
    getUser(token) {
      const username = localStorage.getItem('user')
      axios.get('https://herringg369movieapi.herokuapp.com/users/${username}', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    updateUser(e) {
      e.preventDefault()
      const username = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      axios.put('https://herringg369movieapi.herokuapp.com/users/${username}', {         
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday
        },
        { headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        })
        localStorage.setItem('user', this.state.Username)
        const data = response.data
        alert('The User' + username + 'has been Updated')
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    deleteUser() {
      const username = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      axios.delete(`https://herringg369movieapi.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        alert('This user has been deleted')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.open('/', '_self')
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.open('/', '_self')
    }

  render() {

   return (
       <div className="profileView">
       <h1>Hello {this.state.Username}</h1>
       <p>What would you like to watch today?</p>
       <h2>Favorites: {this.state.FavoriteMovies}</h2>

      <div><button onClick={this.getUser}>View Profile</button></div>
      <button onClick={this.onLoggedOut}>Log Out</button>

      <br/>
      <h2>Update your profile?</h2>
      <Form className="update-form">

        <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => this.setUsername(e.target.value)} placeholder="username" />
        </Form.Group>

        <Form.Group controlId="formUsername">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" onChange={e => this.setEmail(e.target.value)} placeholder="Email" />
        </Form.Group>

        <Form.Group controlId="formUsername">
        <Form.Label>Birhday:</Form.Label>
        <Form.Control type="date" onChange={e => this.setBirthday(e.target.value)} placeholder="Birthday" />
        </Form.Group>

      </Form>

      <div><button onClick={this.deleteUser} className="deleteUser">Delete this User?</button></div>
       </div>
   )
  }
}
