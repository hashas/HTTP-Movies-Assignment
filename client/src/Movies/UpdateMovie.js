import React, { useState } from 'react';
import axios from 'axios';

const UpdateMovie = props => {

    const [ formData, setFormData ] = useState({
        id:'',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    const handleChange = e => {
        console.log('input changed')
        setFormData({
            ...formData,
            [e.target.name]: [e.target.value]
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        putMovie(formData)
        console.log(formData)
        setFormData({
            id:'',
            title: '',
            director: '',
            metascore: '',
            stars: []
        })
    }

    const putMovie = (data) => {
        axios.put(`http://localhost:5000/api/movies/${data.id}`, data)
            .then(res => {
                console.log(res)
                setFormData({
                    id: data.id
                })
                this.props.history.push("/")
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
                    type="text" // will this submit as an array?
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

export default UpdateMovie;