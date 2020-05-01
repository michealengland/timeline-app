import React, { useState } from 'react';
import firebase from '../firebase';

/**
 * Generate a new post with unique ID.
 *
 * @param {*} timeline
 * @param {*} date
 * @param {*} title
 * @param {*} imageUrl
 */
const writeNewPost = ( timeline, date, title, imageUrl ) => {
	firebase.database().ref('timelines/').push( {
		lineName: timeline,
		lineSlug: timeline,
		date: date,
		title: title,
		imageUrl : imageUrl
	} );
}

const AddNewPost = () => {
	const [formTitle, setFormTitle] = useState('');
	const [formCategory, setFormCategory] = useState('');
	const [formImgURL, setFormImgURL] = useState('');
	const [formDate, setFormDate] = useState('');

	const saveNewPost = ( e ) => {
		e.preventDefault();
		setFormCategory( formCategory );
		setFormDate( formDate );
		setFormTitle( formTitle );
		setFormImgURL( formImgURL );

		// write to the DB.
		writeNewPost( formCategory, formDate, formTitle, formImgURL );
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
				<label htmlFor="image-url">Image URL</label>
				<input
					id="image-url"
					name="image-url"
					onChange={ (e) => (setFormImgURL( e.target.value )) }
					type="url"
					value={ formImgURL }
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