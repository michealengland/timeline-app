import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ( { children } ) => (
	<>
		<Header
			siteTitle="Timeline App"
		/>
		<div>
			{ children }
		</div>
		<Footer
			copyRightText="Timeline App 2020"
		/>
	</>
);

export default Layout;