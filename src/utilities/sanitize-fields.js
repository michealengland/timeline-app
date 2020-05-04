import { deburr, toLower, trim } from 'lodash';
import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML and prevents XSS attacks
 *
 * @param {string} string value to sanitize.
 * @return sanitized string.
 * @link https://www.npmjs.com/package/dompurify#how-do-i-use-it
 */
export function purify( string ) {
	// Purify dirty string.
	return DOMPurify.sanitize( string );
}

/**
 * Performs some basic cleanup of a string for use as a post slug.
 *
 * This replicates some of what `sanitize_title()` does in WordPress core, but
 * is only designed to approximate what the slug will be.
 *
 * Converts whitespace, periods, forward slashes and underscores to hyphens.
 * Converts Latin-1 Supplement and Latin Extended-A letters to basic Latin
 * letters. Removes combining diacritical marks. Converts remaining string
 * to lowercase. It does not touch octets, HTML entities, or other encoded
 * characters.
 *
 * @param {string} string Title or slug to be processed.
 *
 * @return {string} Processed string.
 */
const sanitizeHyphenatedSlug = ( string ) => {
	if ( ! string ) {
		return '';
	}

	// Purify dirty string.
	purify( string );

	// Convert to lowercase hyphenated string.
	return toLower(
		deburr( trim( string.replace( /[\s\./_]+/g, '-' ), '-' ) )
	);
}

export { sanitizeHyphenatedSlug };