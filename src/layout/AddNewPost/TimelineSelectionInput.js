import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { getUserTimelines } from '../../utilities/query';

const TimelineSelectionInput = ({isNew, uid, updateNewTimeline, updateSelect}) => {
	const [timelines, setTimelines] = useState([]);

	// TODO Update value settings on inputs.

	/**
	 * Get user timelines.
	 */
	useEffect(() => {
		// uid && setTimelines(getUserTimelines( uid ));
		const setTimelineOptions = async () => {
			const userTimelines = await getUserTimelines( uid )

			setTimelines(userTimelines)

			// Set first value as deafult.
			if (userTimelines.length > 0) {
				updateSelect(userTimelines[0].timelineID)
			}
		}

		setTimelineOptions()
	}, []);

	// New Timeline input change.
	const onNewTimelineChange = (e) => {
		updateNewTimeline(e.target.value)
	}

	// Timeline selection input change.
	const onTimelineSelect = (e) => {
		updateSelect(e.target.value)
	}

	return (
		<div>
			{ isNew &&
				<>
					<label htmlFor="category">New Timeline Name</label>
					<input
						id="category"
						maxLength="20"
						minLength="3"
						name="category"
						onChange={ onNewTimelineChange }
						required
						type="text"
						// value={ timelineNew }
					/>
				</>
			}
			{ ! isNew && timelines && timelines.length > 0 &&
				<>
					<label htmlFor="timeline-select">Select a Timeline</label>
					<select
						id="timeline-select"
						onChange={ onTimelineSelect }
						required
						// value={ timelineId }
					>
						{ timelines.map( ( timeline, key ) => (
							<option key={ key } value={ timeline.timelineID }>{ timeline.label }</option>
						) ) }
					</select>
				</>
			}
		</div>
	)
}

export default TimelineSelectionInput;

TimelineSelectionInput.propTypes = {
	isNew: PropTypes.bool,
	uid: PropTypes.string.isRequired,
	updateNewTimeline: PropTypes.func.isRequired,
	updateSelect: PropTypes.func.isRequired,
}

TimelineSelectionInput.defaultProps = {
	isNew: false,
}