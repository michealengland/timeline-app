import React from 'react'

export default function Loading() {
  const style = {
    animationDuration: '100ms',
    alignItems: 'center',
    animationName: 'fadein',
    color: '#232329',
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
