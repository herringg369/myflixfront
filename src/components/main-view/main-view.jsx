import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom'

import { setMovies } from '../../actions/actions'
import MoviesList from '../movies-list/movies-list'

import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'
import { LoginView } from '../login-view/login-view'
import { RegistrationView } from '../registration-view/registration-view'
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view'
import './main-view.scss'

import { Row, Col, Navbar, Nav } from 'react-bootstrap'

class MainView extends React.Component {

    constructor(){
        super()
        // stores data
        this.state = {
           user: null,
           FavoriteMovies: []
        }
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

    setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
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

      onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self')
      }

      getMovies(token) {
        axios.get('https://herringg369movieapi.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          // Assign the result to the state
          this.props.setMovies(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      /*test() {
        console.log('test')
      }*/

      render() {

        const { movies } = this.props
        const { user }  = this.state;

        return (
          <div>
          <Navbar expand='lg'>
            <Nav.Link href='/register'>Register</Nav.Link>
            <br/>
            <Nav.Link href={`/users/:Username`}>User Profile</Nav.Link>
            <br/>
            <Nav.Link href='/'>Movies</Nav.Link>
          </Navbar>
          <Router>
            <Row className="main-view justify-content-md-center">
              <Route exact path="/" render={() => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />
              }} />
              <Route path="/register" render={() => {
                if (user) return <Redirect to="/" />
                alert('You are already signed in')
                return <Col>
                  <RegistrationView />
                </Col>
              }} />

              <Route exact path="/users/:Username" render={() => {
                if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)}  />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col>
               <ProfileView user={user} />
               </Col>
              }} />
    
              <Route path="/movies/:movieId" render={({ match, history }) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                </Col>
              }} />
    
              <Route path="/directors/:name" render={({ match, history }) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                </Col>
              }
              } />
    
              <Route path="/genres/:name" render={({ match, history }) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                </Col>
              }
              } />
            </Row>
          </Router>
          </div>
        );
      }
    }

    let mapStateToProps = state => {
      return { movies: state.movies }
    }

    export default connect(mapStateToProps, { setMovies } )(MainView)