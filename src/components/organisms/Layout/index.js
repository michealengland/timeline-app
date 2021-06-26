import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Header from '@Organisms/Header'
import Footer from '@Organisms/Footer'
import Loading from '@Atoms/Loading'
import TimelineControls from '@Organisms/TimelineControls'

export default function Layout({changePostDirection, children, hasPosts, onLogout, uid}) {
  const lightMode = {
    backgroundColor: '#fffef9',
    color: '#232329',
  }

  const darkMode = {
    backgroundColor: '#171219',
    color: '#fff',
  }

  const [theme, setTheme] = useState(lightMode)

  const layoutStyle = {
    ...theme,
    minHeight: '100vh',
  }

  // Update theme in layout.
  const onChange = newTheme => {
    setTheme('Light' === newTheme ? darkMode : lightMode)
  }

  if (uid === undefined) {
    return <Loading theme={theme} />
  }

  return (
    <div style={layoutStyle}>
      <Header />
      {uid !== null && (
        <TimelineControls
          changePostDirection={changePostDirection}
          hasPosts={hasPosts}
          onChange={onChange}
          onLogout={onLogout}
          uid={uid}
        />
      )}
      <main>{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  changePostDirection: PropTypes.func,
  children: PropTypes.element,
  hasPosts: PropTypes.bool,
  onLogout: PropTypes.func,
  posts: PropTypes.array,
  uid: PropTypes.string,
}

Layout.defaultProps = {
  hasPosts: false,
}
