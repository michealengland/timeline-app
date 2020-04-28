import React from 'react';
import Header from './Header';
import Footer from './Footer';
import TimelineControls from './TimelineControls';

const Layout = ( { children } ) => (
	<>
		<Header
			siteTitle="Timeline App"
		/>
		<TimelineControls />
		<div>
			{ children }
		</div>
		<Footer
			copyRightText="Timeline App 2020"
		/>
	</>
);

export default Layout;