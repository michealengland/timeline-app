import React from 'react';
import Header from './Header';
import Footer from './Footer';
import TimelineControls from './TimelineControls';

const Layout = ( { children, uid } ) => (
	<>
		<Header
			siteTitle="Timeline App"
			uid={ uid }
		/>
		<TimelineControls uid={ uid } />
		<div>
			{ children }
		</div>
		<Footer
			copyRightText="Timeline App 2020"
		/>
	</>
);

export default Layout;