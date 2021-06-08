import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../organisms/Header'
import Footer from '../../organisms/Footer'

export default function Loading({theme}) {
  const style = {
    ...theme,
    animationDuration: '100ms',
    alignItems: 'center',
    animationName: 'fadein',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100vw',
  }

  const headerStyle = {
    fontSize: '2em',
    marginTop: 'auto',
    marginBottom: 'auto',
  }

  return (
    <div style={style}>
      <Header />
      <h3 style={headerStyle}>Loading...</h3>
      <Footer />
    </div>
  )
}

Loading.propTypes = {
  theme: PropTypes.shape({
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
  }),
}
