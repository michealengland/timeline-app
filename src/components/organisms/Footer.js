import React from 'react'
import PropTypes from 'prop-types'

const Footer = ({copyRightText}) => <footer>{copyRightText}</footer>

Footer.propTypes = {
  copyRightText: PropTypes.string,
}

export default Footer
