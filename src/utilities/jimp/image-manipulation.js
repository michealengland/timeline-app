import Jimp from 'jimp'

/**
 * Generate a new resized and compressed image file.
 *
 * @param {Object} File of image to resize.
 * @return {Promise} Newly resized file.
 */
const resizeImage = async imageFile => {
  if (!imageFile.type || 'image/jpeg' !== imageFile.type) {
    return imageFile
  }

  let resizedImageData = {}

  const optimizedImageBuffer = await Jimp.read(URL.createObjectURL(imageFile))
    .then(
      image =>
        image
          .scaleToFit(800, Jimp.AUTO) // 800xAUTO soft scale to a width of 800px.
          .quality(85), // Set JPEG quality
    )
    .then(image => {
      // clone paramaters from newly generated image object.
      const tempImgDataStorage = {...image.bitmap}

      // Assign new height & width values to resized resizedImageData.
      resizedImageData.height = tempImgDataStorage.height
      resizedImageData.width = tempImgDataStorage.width

      // Return buffer.
      return image.getBufferAsync(Jimp.AUTO) // Convert to buffer
    })
    .catch(err => {
      console.error(err)
    })

  // Generate a new file based on optimizedImageBuffer.
  resizedImageData.file = new File([optimizedImageBuffer], imageFile.name, {
    type: 'image/jpeg',
  })

  return resizedImageData
}

export default resizeImage
