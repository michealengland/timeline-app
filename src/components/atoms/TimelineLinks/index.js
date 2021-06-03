import React from 'react'
import PropTypes from 'prop-types'
import TimelineLink from '../TimelineLink'

export default function TimelineLinks({id, timelines}) {
  const hasTimelines = Array.isArray(timelines) && timelines.length

  return (
    <>
      {hasTimelines && (
        <div>
          {timelines.map(({id: timelineId, label}) => (
            <TimelineLink id={id} key={`${id}${timelineId}`} label={label} />
          ))}
        </div>
      )}
    </>
  )
}

TimelineLinks.propTypes = {
  id: PropTypes.string,
  timelines: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
}
