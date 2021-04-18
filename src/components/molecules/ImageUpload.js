import React from 'react'
import PropTypes from 'prop-types'

const ImageUpload = ({onChange, placeholderURL, progress, resetMedia}) => {
  const uploadStyle = {
    objectFit: 'cover',
    height: 'auto',
    maxWidth: '400px',
  }

  return (
    <div>
      {progress > 0 && <progress value={progress || 0} max="100" />}
      {progress === 100 && <p>Upload successful!</p>}
      <br />
      <label htmlFor="image">Image Upload</label>
      <input
        name="image"
        type="file"
        // accept="image/*"
        onChange={onChange}
      />
      <div>
        {placeholderURL && <button onClick={resetMedia}>Remove</button>}
        <br />
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
    </div>
  )
}

ImageUpload.propTypes = {
  onChange: PropTypes.func,
  placeholderURL: PropTypes.string,
  progress: PropTypes.number,
  resetMedia: PropTypes.func,
}

export default ImageUpload
