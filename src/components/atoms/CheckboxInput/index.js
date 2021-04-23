import React from 'react'
import PropTypes from 'prop-types'

// @TODO Add error handling
export default function CheckboxInput(props) {
  const {checked, id, label, onChange} = props

  return (
    <div className="checkbox-input">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        checked={checked}
        id={id}
        name={id}
        onChange={onChange}
        type="checkbox"
        {...props}
      />
    </div>
  )
}

CheckboxInput.propTypes = {
  checked: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

CheckboxInput.defaultProps = {
  checked: false,
}
