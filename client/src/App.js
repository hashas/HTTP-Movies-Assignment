import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
// import new form component
// import UpdateMovie from "./Movies/UpdateMovie";
import Update from "./Movies/Update";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [setMovieList]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie 
          addToSavedList={addToSavedList}
          movieList={movieList}
          setMovieList={setMovieList}
        />
      </Route>
      
      {/* For some reason when I used below method of specifying Route
      I was having problems accessing props.match.params.id in the 
      component, so I stuck to the above specification instead
      (importing hooks in the component) as I didn't want to spend 
      more time troubleshooting. */}

      {/* <Route 
        path="/movies/:id"
        render={props => {
          return (
            <Movie 
              {...props}
              addToSavedList={addToSavedList} 
              setMovieList={setMovieList}
            />
          )
        }}
      /> */}

      {/* add a new Route path */}
      {/* <Route path="/update-movie/:id">
        <UpdateMovie movieList={movieList} updateList={setMovieList}/>
      </Route> */}

      {/* declared the above route the old way so that I could spread props */}
      <Route 
        path="/update-movie/:id"
        render={props => {
          return (
            <Update 
            // spreading props and passing to the component allows me to access
            // props.match.params.id and props.history
            {...props}
            // passing the follow props allows me to update the movie list
            // in the component
            movieList={movieList} 
            setMovieList={setMovieList} 
            />
          )
        }}
      />
    </>
  );
};

export default App;
