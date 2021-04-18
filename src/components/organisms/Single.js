import React from 'react'
import PropTypes from 'prop-types'
import TimelinePost from '../organisms/TimelinePost'
import PostControls from '../molecules/PostControls'

const Single = props => {
  const {date, id, imageURL, slug, timeline, title} = props

  return (
    <div>
      <PostControls {...props} />
      <TimelinePost
        date={date}
        id={id}
        imageURL={imageURL}
        slug={slug}
        timeline={timeline}
        title={title}
      />
    </div>
  )
}

Single.propTypes = {
  date: PropTypes.string,
  id: PropTypes.string,
  imageURL: PropTypes.string,
  slug: PropTypes.string,
  timeline: PropTypes.object,
  title: PropTypes.string,
}

export default Single
