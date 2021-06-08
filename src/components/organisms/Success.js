import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

const Success = ({successHeader}) => {
  const [redirect, SetRedirect] = useState(false)

  useEffect(() => {
    // Example using setInterval
    const timer = setInterval(() => {
      SetRedirect(true)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  const style = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '50vh',
    textAlign: 'center',
  }

  const headerStyle = {
    animationDuration: '300ms',
    animationName: 'fadein',
  }

  return (
    <div style={style}>
      <h1 style={headerStyle}>{successHeader}</h1>
      {redirect === true && <Redirect push to="/" />}
    </div>
  )
}

Success.propTypes = {
  successHeader: PropTypes.string,
}

export default Success
