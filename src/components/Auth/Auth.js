import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from "../UI/Button/Button";
import axios from '../../axios/authInstance';

import styles from './Auth.module.css';

const Auth = (props) => {
	const history = useHistory();

	const [emailState, setEmailState] = useState(''),
		[passwordState, setPasswordState] = useState(''),
		[requestPath, setRequestPath] = useState('');

	useEffect(() => {
		if (requestPath) {
			let url = requestPath,
				sendObject = {
					email: emailState,
					password: passwordState
				};

			if (requestPath === '/login') {
				url += requestPath === '/login' ? `?email=${ emailState }&password=${ passwordState }` : '';
				sendObject = null;
			}

			axios.post(url, sendObject)
				.then(response => {
					if (response.data.body) {
						localStorage.setItem('access_token', response.data.body.access_token);
						localStorage.setItem('refresh_token', response.data.body.refresh_token);
						history.push('/profile');
					} else {
						alert(response.data.message);
						setRequestPath(null);
					}
				})
				.catch(error => {
					console.log(error);
					setRequestPath(null);
				})
		}
	}, [requestPath, emailState, passwordState, history]);

	return (
		<div className={ styles.Auth }>
			<h1 className={ styles.Title }>Authentication</h1>
			<input type="email"
			       placeholder='Email'
			       className={ styles.Input }
			       value={ emailState }
			       onChange={ event => setEmailState(event.target.value) }/>
			<input type="password"
			       placeholder='Password'
			       className={ styles.Input }
			       value={ passwordState }
			       onChange={ event => setPasswordState(event.target.value) }/>
			<div className={ styles.ButtonsWrapper }>
				<Button styles={ styles.Button } click={ () => setRequestPath('/sign_up') }>Sign Up</Button>
				<Button styles={ styles.Button } click={ () => setRequestPath('/login') }>Sign In</Button>
			</div>
		</div>
	);
};

export default Auth;