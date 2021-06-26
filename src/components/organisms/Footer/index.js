import React from 'react'
import PropTypes from 'prop-types'
import appConfig from '@AppConfig'

export default function Footer() {
  return <footer>{`${appConfig.name} 2020`}</footer>
}

Footer.propTypes = {
  copyRightText: PropTypes.string,
}
