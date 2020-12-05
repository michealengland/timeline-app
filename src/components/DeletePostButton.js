import React, {useState} from 'react';
import PropTypes from 'prop-types';

export const DeletePostButton = ({onDelete}) => {
	const [isDeleting, setIsDeleting] = useState(false)

	/**
	 * Initiate Post Delete UI on Click.
	 */
	const toggleDeleteProcess = () => {
		setIsDeleting(! isDeleting)
	}

	const cancelDelete = () => {
		setIsDeleting(false)
	}

	const deletePost = () => {
		console.log('DELETE POST')
		// onDelete
	}

	return (
		<>
			{ ! isDeleting && <button onClick={ toggleDeleteProcess }>Delete Post</button> }
			{ isDeleting &&
				<span>
					<button onClick={ deletePost }>Yes, Delete</button>
					<button onClick={ cancelDelete }>Cancel</button>
				</span>
			}
		</>
	)
}

export default DeletePostButton;

DeletePostButton.propTypes = {
	onDelete: PropTypes.func.isRequired,
}