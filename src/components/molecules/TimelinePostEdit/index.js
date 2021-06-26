import React from 'react'
import updatePost from '@Utilities/firebase/updatePost'
import PropTypes from 'prop-types'
import TimelineLinks from '@Atoms/TimelineLinks'
import TextInput from '@Atoms/TextInput'
import DatePickerInput from '@Atoms/DatePickerInput'

export default function TimelinePostEdit({
  date,
  id,
  media: {height, url, width},
  timelineData,
  title,
  uid,
}) {
  return (
    <article>
      <form className="post-edit">
        <div className="post-header">
          <div className="post-title">
            <TextInput
              onChange={() => {}}
              onBlur={e => {
                if (title !== e.target.value) {
                  updatePost(id, uid, {title: e.target.value})
                }
              }}
              defaultValue={title}
            />
          </div>
          <TimelineLinks groupId={id} timelines={timelineData} />
          <DatePickerInput
            date={date}
            label="Date"
            name="date"
            onUpdate={newDate => {
              if (date !== newDate) {
                updatePost(id, uid, {date: newDate})
              }
            }}
          />
        </div>
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
  uid: PropTypes.string.isRequired,
}

TimelinePostEdit.defaultProps = {
  isEditing: false,
  media: {},
}
