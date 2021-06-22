import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import TimelinePost from '../TimelinePost'

export default function Timeline({hasPosts, timelinePosts, uid}) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Check if posts are loaded.
  useEffect(() => {
    if (hasPosts) {
      setIsLoaded(true)
    }
  }, [isLoaded, timelinePosts])

  const loadingStyle = {
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 300ms linear',
  }

  return (
    <div style={loadingStyle}>
      { hasPosts &&
        timelinePosts.map((data) => <TimelinePost key={data.id} {...data} uid={uid} />)
      }
    </div>
  )
}

Timeline.propTypes = {
  hasPosts: PropTypes.bool,
  timelinePosts: PropTypes.arrayOf(PropTypes.object),
  uid: PropTypes.string.isRequired,
}

Timeline.defaultProps = {
  hasPosts: false,
}
