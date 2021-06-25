import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import Loading from '../atoms/Loading'
import TimelineControls from './TimelineControls'
import getUserSetting from '../../utilities/getUserSetting'

const Layout = ({changePostDirection, children, hasPosts, onLogout, uid}) => {
  const lightMode = {
    backgroundColor: '#fffef9',
    color: '#232329',
  }

  const darkMode = {
    backgroundColor: '#171219',
    color: '#fff',
  }

  const [userTheme, setUserTheme] = useState('light')
  const [theme, setTheme] = useState(lightMode)

  useEffect(() => {
    async function getCurrentUserTheme() {
      const results = await getUserSetting(uid, 'theme');

      console.log('RESULTS', results)

      return results;
    }

    setUserTheme(getCurrentUserTheme())
  }, [theme])


  const layoutStyle = {
    ...theme,
    minHeight: '100vh',
  }

  // Update theme in layout.
  const onChange = () => {
    setTheme('light' !== userTheme ? darkMode : lightMode)
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

export default Layout
