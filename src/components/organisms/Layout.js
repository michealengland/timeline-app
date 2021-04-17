import React, {useState, useEffect} from 'react'
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
  const [isLoaded, setIsLoaded] = useState(false)

  // Check if posts are loaded.
  useEffect(() => {
    if (uid !== '') {
      setIsLoaded(true)
    }
  }, [isLoaded, uid])

  // Update theme in layout.
  const onChange = newTheme => {
    setTheme('Light' === newTheme ? darkMode : lightMode)
  }

  // Fade in Posts.
  const loadingStyle = {
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 300ms linear',
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
      <main style={loadingStyle}>{children}</main>
      <Footer copyRightText="Timeline App 2020" />
    </div>
  )
}

export default Layout
