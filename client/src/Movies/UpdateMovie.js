// OBSOLETE COMPONENT: 
// I copied this files to Update.js in './Movies/Update/' and
// continued working from there. I retained this for reference
// only.

// import React, { useState } from 'react';
// import axios from 'axios';
// // import useRouteMatch to get access to *match* data from <Route>
// // import { useRouteMatch } from 'react-router-dom';

// // import useParams hook here to in order to use the dynamic
// // routes specificed in App.js
// import { useParams } from 'react-router-dom'; // move this to app.js?

// // import useHistory hook so we can programmatically 
// // navigate to other routes when the state gets updated in
// // putMovie function below
// import { useHistory } from 'react-router-dom';

// const UpdateMovie = props => {

//     // we can use this hook now to grab info about the way
//     // React Router matched this route
//     // const params = useParams();

//     // we use this hook to go back to movielist after state
//     // is updated
//     // const history = useHistory();

//     const [ formData, setFormData ] = useState({
//         id: props.match.params.id,
//         title: '',
//         director: '',
//         metascore: '',
//         stars: []
//     })

//     // find the params.id from the movieList and set it to selectedMovie
//     const selectedMovie = props.movieList.find( film => {
//         return `${film.id}` === props.match.params.id;
//     })
//     console.log(selectedMovie)
//     // if selectedMovie is not null/undefined set it to formData
//     if (selectedMovie) {

//     }

//     const handleChange = e => {
//         console.log('input changed')
//         setFormData({
//             ...formData,
//             [e.target.name]: [e.target.value]
//         })
//     }

//     const handleSubmit = e => {
//         e.preventDefault()
//         console.log(formData)
//         setFormData({
//             id: props.match.params.id,
//             title: '',
//             director: '',
//             metascore: '',
//             stars: []
//         })
//         putMovie(formData)
//     }

//     const putMovie = (data) => {
//         // useEffect with blank dependency array ??
//         axios.put(`http://localhost:5000/api/movies/${data.id}`, data)
//             .then(res => {
//                 console.log(res)
//                 setFormData({
//                     id: data.id,
//                     ...formData
//                 })
//                 // props.updateList(res.data) // wrong because its setting just one movie to the whole movielist
//                 props.history.push("/") // it redirects to home but not refreshing with updated movie even though api data is updated
//                 // this is refreshing the page but must be a better way to do it
//                 // window.location.reload() 
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit}> 
//                 <input 
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     placeholder="Title..."
//                     onChange={handleChange}
//                 />
//                 <br />
//                 <input
//                     type="text"
//                     name="director"
//                     value={formData.director}
//                     placeholder="Director..."
//                     onChange={handleChange}
//                 />
//                 <br />
//                 <input 
//                     type="number"
//                     name="metascore"
//                     value={formData.metascore}
//                     placeholder="Metascore..."
//                     onChange={handleChange}
//                 />
//                 <br />
//                 <input 
//                     type="text" // will this submit as an array?
//                     name="stars"
//                     value={formData.stars}
//                     placeholder="Stars... (separate names by comma)"
//                     onChange={handleChange}
//                 />
//                 <br />
//                 <button type="submit">Update Movie Info</button>
//             </form>
//         </div>
//     )
// };

// export default UpdateMovie;