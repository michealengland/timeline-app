import React from 'react';
import PropTypes from 'prop-types';

export const EditPostButton = ({isEditing, editToggle}) => {
	/**
	 * Toggle value on button click.
	 */
	const onEditPostClick = () => {
		editToggle(!isEditing)
	}

	return (
		<>
			{ ! isEditing && <button onClick={ onEditPostClick }>Edit Post</button> }
			{ isEditing && <button onClick={ onEditPostClick }>Cancel Edit</button> }
		</>
	)
}

export default EditPostButton;

EditPostButton.propTypes = {
	isEditing: PropTypes.bool.isRequired,
	editToggle: PropTypes.func.isRequired,
}