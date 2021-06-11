import Jimp from 'jimp'

/**
 * Generate a new resized and compressed image file.
 *
 * @param {Object} File of image to resize.
 * @return {Promise} Newly resized file.
 */
const resizeImage = async (imageFile) => {
  if (!imageFile.type || 'image/jpeg' !== imageFile.type) {
    return imageFile
  }

  let resizedImageData = {};

  const optimizedImageBuffer = await Jimp
    .read(URL.createObjectURL(imageFile))
    .then((image) => {
      // Assign size values.
      resizedImageData.height = image?.bitmap?.height
      resizedImageData.width = image?.bitmap?.height

      // Return manipulated image buffer.
      return image
        .scaleToFit(800, 800)      // 800x800 softcrop
        .quality(80)               // Set JPEG quality
        .getBufferAsync(Jimp.AUTO) // Convert to buffer
    }).catch((err) => {
      console.error(err);
    })

    // Generate a new file based on optimizedImageBuffer.
    resizedImageData.file = new File(
      [optimizedImageBuffer],
      imageFile.name,
      {type: 'image/jpeg'}
    );

    return resizedImageData;
}

export default resizeImage
