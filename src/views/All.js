import React, { useState, useEffect } from 'react';
import TimelinePost from '../components/TimelinePost';
import PropTypes from 'prop-types';

const All = ( { timelinePosts } ) => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(()=>{
		setIsLoaded(true)
	}, [])

	const loadingStyle = {
		opacity: isLoaded ? 1 : 0,
		transition: 'opacity 300ms linear',
	}

	return (
		<>
		{ isLoaded && timelinePosts.length > 0 &&
			<div style={ loadingStyle }>
				{ timelinePosts.map( ( data, key ) => {
					const {
						date,
						id,
						imageURL,
						slug,
						timeline,
						title,
					} = data;

					return(
						<TimelinePost
							date={ date }
							id={ id }
							imageURL={ imageURL }
							key={ key }
							slug={ slug }
							style={ loadingStyle }
							timeline={ timeline }
							title={ title }
						/>
					);
				} ) }
			</div>
		}
		</>
	);
};

export default All;

All.propTypes = {
	timelinePosts: PropTypes.array,
}

All.defaultProps = {
	timelinePosts: [],
}