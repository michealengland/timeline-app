import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import TimelinePost from '../TimelinePost'

export default function Timeline({timelinePosts, uid}) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Check if posts are loaded.
  useEffect(() => {
    if (uid !== null && Array.isArray(timelinePosts) && timelinePosts.length > 0) {
      setIsLoaded(true)
    }
  }, [isLoaded, timelinePosts, uid])

  const loadingStyle = {
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 300ms linear',
  }

  return (
    <div style={loadingStyle}>
      {isLoaded === true &&
        timelinePosts.length >= 1 &&
        timelinePosts.map((data, key) => {
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
    </div>
  )
}

Timeline.propTypes = {
  timelinePosts: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      id: PropTypes.string,
      imageURL: PropTypes.string,
      slug: PropTypes.string,
      timelines: PropTypes.object,
      title: PropTypes.string,
    }),
  ),
  uid: PropTypes.string,
}
