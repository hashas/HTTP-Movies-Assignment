import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

//import Link from react router dom for the Update button
import { Link } from "react-router-dom";

// import useHistory to redirect in axios.delete
import { useHistory } from 'react-router-dom';

function Movie(props) {
  // define history for the redirect for in the axios.delete request
  const history = useHistory();

  const [movie, setMovie] = useState(null);
  // I hadn't come across useRouteMatch() before, I learned
  // that its a hook introduced in 2019 to access match.params.id
  // in the entire tree of components rather than spreading props
  // in the render prop of the Route in App.js
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
        // axios.delete returns a single id e.g. '1' as the response
        // so I set this to a variable:
        const deletedId = res.data;
        // create a new list of movies to update movieList so that
        // when we redirect to App.js it loads with the udpated list
        const newMovies = props.movieList.filter( movie => {
          // Using != instead of !== solved the problem 
          // that when history.push() was redirecting to '/'
          // it was not refreshing with the updated movieList in '/'. 
          // This solved it because I must have been storing
          // deletedId as a string and not a number
          if (`${movie.id}` != deletedId) {
              return movie;
          }
        })
        console.log(newMovies)
        // update App.js state movieList with the new list of movies
        // created above:
        props.setMovieList(newMovies);
        console.log(newMovies)
        // redirect back to '/'
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
      {/* this links to the Route in App.js which loads update form */}
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
