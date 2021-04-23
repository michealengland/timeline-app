import React from 'react'
import PropTypes from 'prop-types'

// @TODO Add error handling
export default function TextInput(props) {
  const {id, label, onBlur, onChange, value} = props

  return (
    <div className="text-input">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        name={id}
        onBlur={onBlur}
        onChange={onChange}
        type="text"
        value={value}
        {...props}
      />
    </div>
  )
}

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}
