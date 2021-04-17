import React from 'react'

const Controls = ({ariaRole, children}) => {
  const style = {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  }

  const innerWrap = {
    margin: '0 auto',
    maxWidth: '800px',
  }

  return (
    <section style={style} role={ariaRole}>
      <div style={innerWrap}>{children}</div>
    </section>
  )
}

export default Controls
