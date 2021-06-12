import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import TimelinePost from '../TimelinePost'

export default function Timeline({timelinePosts}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const hasPosts = Array.isArray(timelinePosts) && timelinePosts.length > 0

  // Check if posts are loaded.
  useEffect(() => {
    if (hasPosts) {
      setIsLoaded(true)
    }
  }, [isLoaded, timelinePosts])

  const loadingStyle = {
    opacity: hasPosts ? 1 : 0,
    transition: 'opacity 300ms linear',
  }

  return (
    <div style={loadingStyle}>
      { hasPosts &&
        timelinePosts.map((data) => <TimelinePost key={data.id} {...data} />)
      }
    </div>
  )
}

Timeline.propTypes = {
  timelinePosts: PropTypes.arrayOf(PropTypes.object)
}
