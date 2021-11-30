import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios'

import { Link } from 'react-router-dom'

export class MovieCard extends React.Component {

  render() {

    const { movie } = this.props;

    const updateFav = function () {
      const username = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      const movieID = movie._id
  
      axios.post(`https://herringg369movieapi.herokuapp.com/users/${username}/movies/${movieID}}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        FavoriteMovies: movieID
      });
      alert('Added to favorites')
    })
    .catch(function (error) {
      console.log(error);
    });
  }

    console.log(movie._id)
    
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Button onClick={updateFav}>Add To Favorites?</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      Description: PropTypes.string,
      ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };