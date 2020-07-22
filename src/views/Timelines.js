import React, { useState, useEffect } from 'react';
import TimelineCard from '../components/TimelineCard';
import { getUserTimelines } from '../utilities/query';

const Timelines = ( { uid } ) => {
	const [timelines, setTimelines] = useState([]);

	const userTimelines = getUserTimelines( uid );

	if ( userTimelines > 0 ) {
		setTimelines( getUserTimelines( uid ) );
	}

	return (
		<div>
			{
				timelines.map( ( timeline, key ) => {
					const {
						authorID,
						dateCreated,
						label,
						posts,
						slug,
						timelineID,
					} = timeline;

					return(
						<TimelineCard
							authorID={ authorID }
							dateCreated={ dateCreated }
							id={ timelineID }
							key={ key }
							label={ label }
							posts={ posts }
							slug={ slug }
							timelineID={ timelineID }
						/>
					);
				} )
			}
		</div>
	);
};

export default Timelines;