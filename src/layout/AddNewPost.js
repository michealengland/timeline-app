import React, { useState } from 'react';

const AddNewPost = () => {
	const [formTitle, setFormTitle] = useState('');
	const [formCategory, setFormCategory] = useState('');
	const [formDate, setFormDate] = useState('');

	const saveNewPost = () => {
		setFormCategory( formCategory );
		setFormDate( formDate );
		setFormTitle( formTitle );
	};

	return(
		<form>
			<h1>Add New Post</h1>
			<div>
				<label htmlFor="title">Title (3 to 60 characters):</label>
				<input
					id="title"
					maxLength="60"
					minLength="3"
					name="title"
					onChange={ (e) => (setFormTitle( e.target.value )) }
					type="text"
					value={ formTitle }
				/>
			</div>
			<div>
				<label htmlFor="category">Timeline</label>
				<input
					id="category"
					maxLength="20"
					minLength="3"
					name="category"
					onChange={ (e) => (setFormCategory( e.target.value )) }
					type="text"
					value={ formCategory }
				/>
			</div>
			<div>
				<label htmlFor="date">Date</label>
				<input
					id="date"
					name="date"
					onChange={ (e) => (setFormDate( e.target.value )) }
					type="date"
					value={ formDate }
				/>
			</div>
			<button type="submit" onClick={ saveNewPost }>Submit</button>
		</form>
	);
};

export default AddNewPost;