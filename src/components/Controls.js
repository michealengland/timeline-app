import React from 'react';

const Controls = ( { ariaRole, children } ) => (
	<section role={ ariaRole }>
		{ children }
	</section>
);

export default Controls;