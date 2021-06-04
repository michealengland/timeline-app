import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import TimelinePost from '../organisms/TimelinePost'

// eslint-disable-next-line react/prop-types
const Timeline = ({timelinePosts, timeline, uid}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  // Check if posts are loaded.
  useEffect(() => {
    if (uid !== null && timelinePosts.length > 0) {
      setIsLoaded(true)
    }
  }, [isLoaded, timelinePosts, uid])

  const loadingStyle = {
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 300ms linear',
  }

  // Create array of posts in this Timeline.
  const postsInTimeline = timelinePosts.filter(
    post => post.timeline === timeline,
  )

  return (
    <>
      {postsInTimeline.map((data, key) => {
        const {date, id, imageURL, slug, timelines, title} = data

        return (
          <TimelinePost
            date={date}
            id={id}
            imageURL={imageURL}
            key={key}
            slug={slug}
            style={loadingStyle}
            timelines={timelines}
            title={title}
          />
        )
      })}
    </>
  )
}

Timeline.propTypes = {
  timelinePosts: PropTypes.array,
  timelines: PropTypes.object,
  uid: PropTypes.string,
}

export default Timeline
