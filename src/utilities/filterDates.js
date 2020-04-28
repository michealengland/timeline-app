/**
 * Filter dates.
 *
 * @param dates Array with dates.
 * @param string direction = string forward or reverse
 */
const dateDirection = ( dates, direction ) => {
	// sort Array according to direction.
	if ( direction === 'normal' ) {
		dates.sort();
	} else {
		dates.reverse();
	}

	console.log( 'dates sorted', dates, direction );

	return dates;
};

export default dateDirection;