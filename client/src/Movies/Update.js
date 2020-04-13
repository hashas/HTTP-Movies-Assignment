import React, { useState, useEffect } from 'react';
import axios from 'axios';

// I decided against using the following hooks because I was 
// having an issue redirecting putMovie to '/' and I thought
// it was maybe because history.push() worked different to passing
// {...props} through Route in App.js so I tried the latter, however
// the redirecting issue turned out to be due to .put() returning just 
// the updated movie and not the entire list of movies with the updated 
// one(see putMovie function below), so I had to reconstruct the updated 
// movie list for App.js state and never reimplemented these hooks.
// I did however use this implementation in Movie component.

// // import useRouteMatch to get access to *match* data from <Route>
// import { useRouteMatch } from 'react-router-dom';

// // import useParams hook here to in order to use the dynamic
// // routes specificed in App.js
// import { useParams } from 'react-router-dom'; // move this to app.js?

// // import useHistory hook so we can programmatically 
// // navigate to other routes when the state gets updated in
// // putMovie function below
// import { useHistory } from 'react-router-dom';

const Update = props => {



    // // we can use this hook now to grab info about the way
    // // React Router matched this route
    // const params = useParams();

    // // we use this hook to go back to movielist after state
    // // is updated
    // const history = useHistory();

    const [ formData, setFormData ] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    // useEffect to stop infinite render loop
    useEffect(() => {
        // find the params.id from the movieList and set it to selectedMovie
        const selectedMovie = props.movieList.find( film => {
            return `${film.id}` === props.match.params.id;
        })
        console.log(selectedMovie)
        // if selectedMovie is not undefined set it to formData state
        // this will then prepopulate the input fields with the existing 
        // movie details
        if (selectedMovie) {
            setFormData(selectedMovie)
        }
    // playing/removing/adding the following dependency arrays
    // allowed me to better understand how Effect hook runs
    // AFTER the component renders and ONLY runs AGAIN
    // if either of these arrays change
    }, [props.movieList, props.match.params.id] )



    const handleChange = e => {
        console.log('input changed')
        setFormData({
            // the spread operator here allows me to 'spread'
            // any key already defined in the state AND allows
            // me to 'add/build' on it with each key which is updated
            // by each input field in the form
            ...formData,
            [e.target.name]: [e.target.value]
        })
    }

    const handleSubmit = e => {
        // prevents default behaviour of a normal submit which would
        // otherwise reload the component and thereby resetting state
        e.preventDefault()
        console.log(formData)
        putMovie(formData)
        setFormData({
            id: '',
            title: '',
            director: '',
            metascore: '',
            stars: []
        })
    }

    const putMovie = (data) => {
        axios.put(`http://localhost:5000/api/movies/${data.id}`, data)
            .then(res => {
                console.log(res.data)
                // save the updated response to updatedMovie
                const updatedMovie = res.data
                // reconstruct the movieList for App.js
                const newMovies = props.movieList.map( movie => {
                    // Using == instead of === solved the problem 
                    // that when props.history.push() was redirecting to '/'
                    // it was not refreshing with the updated movieList in '/'. 
                    // This solved it because I must have been storing
                    // updatedMovie.id as a string and not a number
                    if (`${movie.id}` == updatedMovie.id) {
                        return updatedMovie;
                    } else {
                        return movie;
                    }
                })
                // set the newMovies list to to the state in App.js
                props.setMovieList(newMovies)
                // these console logs allowed to me debug why ==/===
                // issue which was preventing the redirect to '/' from
                // loading the updated list of movies 
                console.log(newMovies)
                console.log(props.movieList)
                // redirect back to '/'
                props.history.push("/") 
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}> 
                <input 
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="Title..."
                    onChange={handleChange}
                />
                <br />
                <input
                    type="text"
                    name="director"
                    value={formData.director}
                    placeholder="Director..."
                    onChange={handleChange}
                />
                <br />
                <input 
                    type="number"
                    name="metascore"
                    value={formData.metascore}
                    placeholder="Metascore..."
                    onChange={handleChange}
                />
                <br />
                <input 
                    type="text"
                    name="stars"
                    value={formData.stars}
                    placeholder="Stars... (separate names by comma)"
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Update Movie Info</button>
            </form>
        </div>
    )
};

export default Update;