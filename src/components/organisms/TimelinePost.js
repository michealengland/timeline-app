import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import firebase from '../../firebase'
import {format} from 'date-fns'
import TimelineLinks from '../atoms/TimelineLinks'

const TimelinePost = ({date, id, imageURL, timelines, title}) => {
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
        <TimelineLinks groupId={id} timelines={timelineData} />
        <p>{format(new Date(date), 'iiii, MMMM d, RRRR hh:mm a')}</p>
      </div>
      {imageURL && <img src={imageURL} alt={title} />}
    </article>
  )
}

TimelinePost.propTypes = {
  date: PropTypes.string,
  id: PropTypes.string,
  imageURL: PropTypes.string,
  timelines: PropTypes.object,
  title: PropTypes.string,
}

export default TimelinePost
