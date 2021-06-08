import React from 'react'
import PropTypes from 'prop-types'
import projectConfig from '../../projectConfig'

const Footer = () => <footer>{`${projectConfig.name} 2020`}</footer>

Footer.propTypes = {
  copyRightText: PropTypes.string,
}

export default Footer
