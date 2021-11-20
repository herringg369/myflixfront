import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class DirectorView extends React.Component {
  render() {
    const { director } = this.props

   return (
       <div className="director-view">
          <h1>{director.Name}</h1>
          <div className="directorBio">{director.Bio}</div>
          <div className="directorBirth">{director.Birth}</div>
          <div className="directorDeath">{director.Death}</div>
          <div className="directorMovies">{director.Movies}</div>
       </div>
   )
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth : PropTypes.string,
    Death: PropTypes.string,
    Movies: PropTypes.array
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};