import React from 'react';
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

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
        <button onClick={() => { onBackClick() }}></button>

      </div>
    );
    
    
  }
}

/*
// movie-view.jsx
<Link to={`/directors/${movie.Director.Name}`}>
  <Button variant="link">Director</Button>
</Link>

<Link to={`/genres/${movie.Genre.Name}`}>
  <Button variant="link">Genre</Button>
</Link>
*/

/*
        <Route path="/movies/:movieId" render={({ match, history }) => {
          return <Col md={8}>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
          </Col>
        }} />
*/
