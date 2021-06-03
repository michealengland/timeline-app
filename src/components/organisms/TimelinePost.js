import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import firebase from '../../firebase'
import {format} from 'date-fns'
import TimelineLink from '../atoms/TimelineLink'

// eslint-disable-next-line react/prop-types
const TimelinePost = ({date, id, imageURL, title, timelines}) => {
  // eslint-disable-next-line no-unused-vars
  const [timelineData, setTimelineData] = useState([])

  const style = {
    padding: '.2em',
  }

  useEffect(() => {
    const getTimelineData = async () => {
      if (!timelines) {
        return
      }
      firebase
        .database()
        .ref(`timelines`)
        .once('value')
        .then(function (snapshot) {
          setTimelineData(
            Object.keys(timelines).map(timelineKey => ({
              id: timelineKey,
              ...snapshot.child(timelineKey).val(),
            })),
          )
        })
    }

    getTimelineData()
  }, [timelines])

  return (
    <article>
      <div style={style}>
        <h1>
          <Link to={`/posts/post${id}`}>{title || 'undefined'}</Link>
        </h1>
        {timelineData &&
          timelineData.length &&
          timelineData.map(({id: timelineId, label}) => (
            <TimelineLink
              id={id}
              key={`${id}${timelineId}`}
              label={label}
            />
          ))}
        <p>{format(new Date(date), 'iiii, MMMM d, RRRR hh:mm a')}</p>
      </div>
      {imageURL && <img src={imageURL} alt={title} />}
    </article>
  )
}

export default TimelinePost
