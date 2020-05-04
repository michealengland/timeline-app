import React from 'react';

const ImageUpload = ( { onChange, progress, placeholderURL } ) => {
	const uploadStyle = {
		objectFit: 'cover',
		height: 'auto',
		maxWidth: '400px',
	}

	return (
		<div>
			{ progress > 0 && <progress value={ progress || 0 } max="100"/> }
			{ progress === 100 && <p>Upload successful!</p> }
			<br/>
			<label htmlFor="image">Image Upload</label>
			<input
				name="image"
				type="file"
				onChange={ onChange }
			/>
			<br/>
			{
				<img style={ uploadStyle } src={ placeholderURL || 'http://via.placeholder.com/400x300' } alt="Uploaded images" height="300" width="400"/>
			}
		</div>
	);
};

export default ImageUpload;