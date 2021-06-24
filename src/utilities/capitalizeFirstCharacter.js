/**
 * Capitalize the first letter in a string.
 *
 * @param {string} text String to capitalize.
 * @return {string} String with first letter capitalized.
 */
export default function capitalizeFirstCharacter(text) {
	if (typeof text !== 'string' ) {
		console.error(`capitalizeFirstCharacter(text) failed. text:"${text}"`)
		return text;
	}

	return String(text.charAt(0).toLocaleUpperCase() + text.slice(1));
}