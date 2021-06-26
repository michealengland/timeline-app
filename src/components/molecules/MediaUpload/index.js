import React from 'react'
import PropTypes from 'prop-types'

export default function MediaUpload({onChange, placeholderURL, resetMedia}) {
  const uploadStyle = {
    objectFit: 'cover',
    height: 'auto',
    maxWidth: '400px',
  }

  return (
    <div>
      <label htmlFor="image">Image Upload</label>
      <input
        name="image"
        type="file"
        // accept="image/*"
        onChange={onChange}
      />
      {placeholderURL && <button onClick={resetMedia}>Remove</button>}
      {placeholderURL && (
        <div>
          <img
            style={uploadStyle}
            src={placeholderURL}
            alt="Upload preview"
            height="300"
            width="400"
          />
        </div>
      )}
    </div>
  )
}

MediaUpload.propTypes = {
  onChange: PropTypes.func,
  placeholderURL: PropTypes.string,
  resetMedia: PropTypes.func,
}
