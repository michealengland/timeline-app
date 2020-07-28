import Jimp from 'jimp';

/**
 * Generate a new resized and compressed image file.
 *
 * @param {Object} File of image to resize.
 * @returns {Object} Newly resized file.
 */
const resizeImage = (imageFile, callback) => {
	const newImage = [];

	if ( ! imageFile.type || 'image/jpeg' !== imageFile.type ) {
		return newImage;
	}

	Jimp.read( URL.createObjectURL(imageFile) )
	.then( image => (
		image
			.scaleToFit(800, 800)
			.quality(80) // set JPEG quality
			.greyscale()
			// .brightness( .2 ) // max of 1 or -1
			// .blur( 5 ) // blur by 20px
			// .color([
			// 	{ apply: 'saturate', params: [10] },
			// 	{ apply: 'lighten', params: [1] },
			// 	{ apply: 'xor', params: ['#06D'] }
			//   ])
			.getBuffer(Jimp.AUTO, (err, buffer) => {
				// Convert buffer to new image file.
				const optimizedImage = new File([buffer], imageFile.name, {
					type: 'image/jpeg',
				});

				callback(optimizedImage);

				newImage.push(optimizedImage)
			})
	))
	.catch( err => {
		console.error(err);
	} );

	console.log('newImage before return', newImage);
	return newImage;
}

export default resizeImage;