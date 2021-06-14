import React, {useState} from 'react'
import updatePost from '../../../utilities/updatePost'
import PropTypes from 'prop-types'
import TimelineLinks from '../../atoms/TimelineLinks'
import {format} from 'date-fns'
import TextInput from '../../atoms/TextInput'

export default function TimelinePostEdit({
  date,
  id,
  media: {height, url, width},
  timelineData,
  title,
}) {
  const [titleSubmitted, setIsTitleSubmitted] = useState(false)

  return (
    <article>
      <form className="post-edit">
        <div className="post-title">
          <TextInput
            onChange={() => {}}
            onBlur={e => {
              if (e.target.value !== title) {
                setIsTitleSubmitted(updatePost(id, {title: e.target.value}))
              }
            }}
            defaultValue={title}
          />
          {titleSubmitted && <span>Success!</span>}
        </div>

        <TimelineLinks groupId={id} timelines={timelineData} />
        <p>{format(new Date(date), 'iiii, MMMM d, RRRR hh:mm a')}</p>
        {url && <img alt={title} src={url} height={height} width={width} />}
      </form>
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
