import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const initialItem = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
  };

const MovieForm = (props) => {
    const [movieData, setMovieData] = useState(initialItem);
	const { id } = useParams();
	

	useEffect(() => {
		const itemToUpdate = props.movies.find(movie => `${movie.id}` === id)

        if (itemToUpdate) {
            setMovieData(itemToUpdate)
        }
    }, [props.movies, id]);

	const changeHandler = e => {
        e.persist();
		setMovieData ({ ...movieData, [e.target.name]: e.target.value}) 
	};

	const handleSubmit = e => {
		e.preventDefault();
		// make a PUT request to edit the item
		axios.put(`http://localhost:5000/api/movies/${movieData.id}`, movieData)
			.then( res => {
                props.getMovieList(res.data);
				props.history.push(`/`);
			})
            .catch( err => console.log(err));
            setMovieData({
                id: '',
                title: '',
                director: '',
                metascore: '',
                stars: []
            })
	};

	return (
		<div>
			<h2 className='updatemovie'>Update Movie</h2>
			
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name='title'
					onChange={changeHandler}
					placeholder="Title"
					value={movieData.title}
				/>
				<div className="baseline" />

				<input
					type="text"
					name="director"
					onChange={changeHandler}
					placeholder="Director"
					value={movieData.director}
				/>
				<div className="baseline" />

				<input
					type="text"
					name="metascore"
					onChange={changeHandler}
					placeholder="Metascore"
					value={movieData.metascore}
				/>
				<div className="baseline" />

				<input
					type="text"
					name="stars"
					onChange={changeHandler}
					placeholder="Stars"
					value={movieData.stars}
				/>
				<div className="baseline" />

				<button className="md-button form-button">Update</button>
			</form>
		</div>
	);
};

export default MovieForm;