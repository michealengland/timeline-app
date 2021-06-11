import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import firebase from '../../firebase'
import {format} from 'date-fns'
import TimelineLinks from '../atoms/TimelineLinks'

const TimelinePost = ({date, id, media, timelines, title}) => {
  const [timelineData, setTimelineData] = useState([])
  const {height, url, width} = media

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
      {url && <img alt={title} src={url} height={height} width={width} />}
    </article>
  )
}

TimelinePost.propTypes = {
  date: PropTypes.string,
  id: PropTypes.string,
  media: PropTypes.shape({
    height: PropTypes.number,
    url: PropTypes.string,
    width: PropTypes.number,
  }),
  timelines: PropTypes.object,
  title: PropTypes.string,
}

TimelinePost.defaultProps = {
  media: {},
}

export default TimelinePost
