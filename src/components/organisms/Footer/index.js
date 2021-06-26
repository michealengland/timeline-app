import React from 'react'
import PropTypes from 'prop-types'
import projectConfig from '../../../projectConfig'

export default function Footer() {
  return <footer>{`${projectConfig.name} 2020`}</footer>
}

Footer.propTypes = {
  copyRightText: PropTypes.string,
}
