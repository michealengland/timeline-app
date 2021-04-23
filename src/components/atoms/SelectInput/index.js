import React from 'react'
import PropTypes from 'prop-types'

// @TODO Add error handling
export default function SelectInput(props) {
  const {id, label, onBlur, onChange, options, value} = props

  return (
    <div className="select-input">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        name={id}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        {...props}
      >
        {options.length > 0 &&
          options.map(({option, value}) => (
            <option key={value} value={value}>
              {option}
            </option>
          ))}
      </select>
    </div>
  )
}

SelectInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      option: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string,
}
