import React from 'react'
import PropTypes from 'prop-types'
import TimelineLinks from '../../atoms/TimelineLinks'
import {format} from 'date-fns'

export default function TimelinePostEdit({
  date,
  id,
  media: {height, url, width},
  timelineData,
  title,
}) {
  return (
    <article>
      Editing...
      <div>
        <h1>{title}</h1>
        <TimelineLinks groupId={id} timelines={timelineData} />
        <p>{format(new Date(date), 'iiii, MMMM d, RRRR hh:mm a')}</p>
      </div>
      {url && <img alt={title} src={url} height={height} width={width} />}
    </article>
  )
}

TimelinePostEdit.propTypes = {
  date: PropTypes.string,
  id: PropTypes.string,
  isEditing: PropTypes.bool,
  media: PropTypes.shape({
    height: PropTypes.number,
    url: PropTypes.string,
    width: PropTypes.number,
  }),
  timelines: PropTypes.object,
  timelineData: PropTypes.array,
  title: PropTypes.string,
}

TimelinePostEdit.defaultProps = {
  isEditing: false,
  media: {},
}
