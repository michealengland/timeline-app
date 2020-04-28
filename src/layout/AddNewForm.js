import React, { useState } from 'react';

const AddNewForm = () => {
	const [formTitle, setFormTitle] = useState('');
	const [formCategory, setFormCategory] = useState('');
	const [formDate, setFormDate] = useState('');

	const saveNewPost = () => (
		setFormTitle( formTitle ),
		setFormCategory( formCategory ),
		setFormDate( formDate )
	);

	return(
		<form>
			<h1>Add New Post</h1>
			<label htmlFor="title">Title (3 to 60 characters):</label>
			<input
				type="text"
				id="title"
				name="title"
				minLength="3"
				maxLength="60"
				onChange={ (e) => (setFormTitle( e.target.value )) }
				value={ formTitle }
			/>
			<label htmlFor="category">Timeline Category</label>
			<input
				type="text"
				id="category"
				name="category"
				minLength="3"
				maxLength="20"
				onChange={ (e) => (setFormCategory( e.target.value )) }
				value={ formCategory }
			/>
			<label htmlFor="date">Timeline Post Date</label>
			<input
				type="date"
				id="date"
				name="date"
				onChange={ (e) => (setFormDate( e.target.value )) }
				value={ formDate }
			/>
			<button type="submit" onClick={ saveNewPost }>Submit</button>
		</form>
	);
};

export default AddNewForm;