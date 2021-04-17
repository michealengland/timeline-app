import React, {useState, useEffect} from 'react'
import TimelinePost from '../organisms/TimelinePost'

const All = ({timelinePosts, uid}) => {
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

  return (
    <div style={loadingStyle}>
      {isLoaded === true &&
        timelinePosts.length >= 1 &&
        timelinePosts.map((data, key) => {
          const {date, id, imageURL, slug, timeline, title} = data

          return (
            <TimelinePost
              date={date}
              id={id}
              imageURL={imageURL}
              key={key}
              slug={slug}
              style={loadingStyle}
              timeline={timeline}
              title={title}
            />
          )
        })}
    </div>
  )
}

export default All
