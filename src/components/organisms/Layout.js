import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import TimelineControls from './TimelineControls'

const Layout = ({changePostDirection, children, onLogout, posts, uid}) => {
  const lightMode = {
    backgroundColor: '#fffef9',
    color: '#232329',
    minHeight: '100vh',
  }

  const darkMode = {
    backgroundColor: '#171219',
    color: '#fff',
    minHeight: '100vh',
  }

  const [theme, setTheme] = useState(lightMode)

  // Update theme in layout.
  const onChange = newTheme => {
    setTheme('Light' === newTheme ? darkMode : lightMode)
  }

  return (
    <div style={theme}>
      <Header onLogout={onLogout} siteTitle="Timeline App" uid={uid} />
      {uid !== null && (
        <TimelineControls
          changePostDirection={changePostDirection}
          onChange={onChange}
          posts={posts}
          uid={uid}
        />
      )}
      <main>{children}</main>
      <Footer copyRightText="Timeline App 2020" />
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
