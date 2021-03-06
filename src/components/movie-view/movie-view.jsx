import React from 'react';
import { Link } from 'react-router-dom'
import { axios } from 'axios'
import './movie-view.scss'

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  onBackClick() {
    console.log('test')
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <button onClick={() => { onBackClick() }}>Back</button>

        <Link to={`/directors/${movie.Director.Name}`}>
         <button variant="link">Director</button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
        <button variant="link">Genre</button>
        </Link>

      </div>
    );
    
    
  }
}