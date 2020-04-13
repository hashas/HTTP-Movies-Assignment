import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

//import Link from react router dom
import { Link } from "react-router-dom";

// import useHistory to redirect in axios.delete
import { useHistory } from 'react-router-dom';

function Movie(props) {
  // define history for the redirect for in the axios.delete request
  const history = useHistory();

  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  // handle function for when 'delete' button is pressed
  const handleDelete = e => {
    e.preventDefault()
    axios
      .delete(`http://localhost:5000/api/movies/${match.params.id}`)
      .then(res => {
        console.log(res)
        const deletedId = res.data;
        const newMovies = props.movieList.filter( movie => {
          if (`${movie.id}` != deletedId) {
              return movie;
          }
        })
        console.log(newMovies)
        props.setMovieList(newMovies);
        console.log(newMovies)
        history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${match.params.id}`}>
        <button>
          Update
        </button>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Movie;
