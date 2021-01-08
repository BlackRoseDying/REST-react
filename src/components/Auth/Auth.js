import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Button from "../UI/Button/Button";
import axios from '../../axios/authInstance';

import styles from './Auth.module.css';
import Modal from "../UI/Modal/Modal";

const Auth = (props) => {
	const history = useHistory();

	const [emailState, setEmailState] = useState(''),
		[passwordState, setPasswordState] = useState(''),
		[requestPath, setRequestPath] = useState(''),
		[error, setError] = useState(null);

	useEffect(() => {
		const inteceptor = axios.interceptors.response.use(response => {
			if (response.data.status === 'Ok') return response;

			if (response.data.status === 'error') {
				setError(response.data.message);
				setRequestPath('');

				return response;
			}

			if (response.data.body.status !== 'error') {
				localStorage.setItem('access_token', response.data.body.access_token);
				localStorage.setItem('refresh_token', response.data.body.refresh_token);
				history.push('/profile');
			} else {
				setError(response.data.body.message);
				setRequestPath(null);
			}
		});

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
					if (response && response.data.status === 'Ok') {
						url = `/login?email=${ emailState }&password=${ passwordState }`;

						axios.post(url);
					}
				})
				.catch(error => {
					setError(error.message);
					setRequestPath(null);
				})
		}

		return () => axios.interceptors.response.eject(inteceptor);
	}, [requestPath, emailState, passwordState, history]);

	const changeVisible = useCallback(() => {
		setError(null);
	}, []);

	return (
		<div className={ styles.Auth }>
			<Modal isVisible={ !!error }
			       content={ error }
			       changeVisible={ changeVisible }/>
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