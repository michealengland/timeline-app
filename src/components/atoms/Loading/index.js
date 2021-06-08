import React from 'react'
import PropTypes from 'prop-types'

export default function Loading({theme}) {
  const style = {
    ...theme,
    animationDuration: '100ms',
    alignItems: 'center',
    animationName: 'fadein',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100vw',
  }

  const headerStyle = {
    fontSize: '2em',
  }

  return (
    <div style={style}>
      <h3 style={headerStyle}>Loading...</h3>
    </div>
  )
}

Loading.propTypes = {
  theme: PropTypes.shape({
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
  }),
}
