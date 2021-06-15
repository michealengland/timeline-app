import React from 'react'
import PropTypes from 'prop-types'
import TimelineLink from '../TimelineLink'

export default function TimelineLinks({groupId, timelines}) {
  const hasTimelines = Array.isArray(timelines) && timelines.length

  return (
    <>
      {hasTimelines && (
        <div className="post-timeline-links">
          {timelines.map(({id, label}) => (
            <TimelineLink id={id} key={`${groupId}-${id}`} label={label} />
          ))}
        </div>
      )}
    </>
  )
}

TimelineLinks.propTypes = {
  groupId: PropTypes.string,
  timelines: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
}
