import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import TimelineControls from './TimelineControls';

const Layout = ( { children, onLogout, uid } ) => {
	const lightMode = {
		backgroundColor: '#fffef9',
		color: '#232329',
		minHeight: '100vh',
	};

	const darkMode = {
		backgroundColor: '#171219',
		color: '#fff',
		minHeight: '100vh',
	};

	const [theme, setTheme] = useState( lightMode );

	// Update theme in layout.
	const onChange = ( newTheme ) => {
		setTheme( 'Light' === newTheme ? darkMode : lightMode );
	};

	return (
		<div style={ theme }>
			<Header
				onLogout={ onLogout }
				siteTitle="Timeline App"
				uid={ uid }
			/>
			{
				uid && <TimelineControls uid={ uid } onChange={ onChange } />
			}
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