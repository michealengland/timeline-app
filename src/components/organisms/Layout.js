import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import Loading from '../atoms/Loading'
import TimelineControls from './TimelineControls'

const Layout = ({changePostDirection, children, onLogout, posts, uid}) => {
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
          onChange={onChange}
          onLogout={onLogout}
          posts={posts}
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
  onLogout: PropTypes.func,
  posts: PropTypes.array,
  uid: PropTypes.string,
}

export default Layout
