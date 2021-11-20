import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class GenreView extends React.Component {
  render() {
    const { genre } = this.props

   return (
       <div className="genre-view">
        <h1></h1>

       </div>
   )
  }
}

GenreView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth : PropTypes.string,
    Death: PropTypes.string,
    Movies: PropTypes.array
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};