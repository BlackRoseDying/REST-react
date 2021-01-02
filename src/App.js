import React from 'react';
import { Switch, Route } from 'react-router-dom';

import styles from './App.module.css';
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";

function App() {
	return (
		<div className={ styles.App }>
			<Switch>
				<Route path='/' exact component={ Auth }/>
				<Route path='/profile' component={ Profile }/>
			</Switch>
		</div>
	);
}

export default App;
