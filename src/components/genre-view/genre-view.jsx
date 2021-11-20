import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class GenreView extends React.Component {

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    }

  render() {
    const { genre } = this.props

   return (
       <div className="genre-view">
        <h1>{genre.Name}</h1>
        <div className="genreDescription">{genre.Description}</div>
        <div className="genreMovies">{genre.Movies}</div>
       </div>
   )
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Movies: PropTypes.array
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};