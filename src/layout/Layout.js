import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import TimelineControls from './TimelineControls';

const Layout = ( { children, uid } ) => {
	const lightMode = {
		backgroundColor: '#fffef9',
		color: '#232329',
	};

	const darkMode = {
		backgroundColor: '#171219',
		color: '#fff',
	};

	const [theme, setTheme] = useState( lightMode );

	// Update theme in layout.
	const onChange = ( newTheme ) => {
		setTheme( 'Light' === newTheme ? darkMode : lightMode );
	};

	return (
		<div style={ theme }>
			<Header
				siteTitle="Timeline App"
				uid={ uid }
			/>
			<TimelineControls uid={ uid } onChange={ onChange } />
			<main>
				{ children }
			</main>
			<Footer
				copyRightText="Timeline App 2020"
			/>
		</div>
	);
};

export default Layout;