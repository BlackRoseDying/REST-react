import React, { useState, useEffect } from 'react';

import Button from "../../UI/Button/Button";
import axios from '../../../axios/authInstance';

const AuthForm = (props) => {
	const [emailState, setEmailState] = useState(''),
		[passwordState, setPasswordState] = useState(''),
		[requestPath, setRequestPath] = useState(null);

	useEffect(() => {
		if (requestPath) {
			axios.post(`/${ requestPath }`, {
				email: emailState,
				password: passwordState
			})
				.then(response => {
					alert(response.message);
					setRequestPath(null);
				})
				.catch(error => console.log(error))
		}
	}, [requestPath, emailState, passwordState]);

	return (
		<div>
			<input type="email"
			       placeholder='Email'
			       value={ emailState }
			       onChange={ event => setEmailState(event.target.value) }/>
			<input type="password"
			       placeholder='Password'
			       value={ passwordState }
			       onChange={ event => setPasswordState(event.target.value) }/>
			<Button click={ () => setRequestPath('/sign_up') }>Sign Up</Button>
			<Button click={ () => setRequestPath('/sign_in') }>Sign In</Button>
		</div>
	);
};

export default AuthForm;