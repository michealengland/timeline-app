import React from 'react';
import MaterialDatePicker from '../../components/MaterialDatePicker';
import PropTypes from 'prop-types';

const PostDateInput = ( { onDateChange } ) => (
	<div>
		<p><label htmlFor="date">Date</label></p>
		<MaterialDatePicker
			name="date"
			onUpdate={ onDateChange }
		/>
	</div>
);

export default PostDateInput;

PostDateInput.propTypes = {
	onDateChange: PropTypes.func.isRequired,
}