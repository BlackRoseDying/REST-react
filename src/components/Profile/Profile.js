import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import axios from '../../axios/authInstance';

const getInformation = (token, setInfo, history) => {
	axios.get('/me', {
		headers: {
			Authorization: 'Bearer ' + token
		}
	})
		.then(() => {
			setInfo('Token is valid');
		})
		.catch(() => history.replace('/'));
};

const refreshCurrentToken = (token, setInfo, history) => {
	axios.post('/refresh', null, {
		headers: {
			Authorization: 'Bearer ' + token
		}
	})
		.then(response => {
			localStorage.setItem('access_token', response.data.body.access_token);
			localStorage.setItem('refresh_token', response.data.body.refresh_token);

			getInformation(localStorage.getItem('access_token'), setInfo, history);
		})
		.catch(() => history.replace('/'));
};

const Profile = (props) => {
	const [info, setInfo] = useState('Loading...'),
		history = useHistory();

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');

		const interceptor = axios.interceptors.response.use(response => {
			if (response.data.statusCode === 200) return response;
			else {
				const refreshToken = localStorage.getItem('refresh_token');

				if (refreshToken) refreshCurrentToken(localStorage.getItem('refresh_token'), setInfo, history);
				else history.replace('/');
			}
		});

		if (accessToken) getInformation(localStorage.getItem('access_token'), setInfo, history);
		else {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) refreshCurrentToken(localStorage.getItem('refresh_token'), setInfo, history);
			else history.replace('/');
		}

		return () => axios.interceptors.response.eject(interceptor);
	}, [history]);

	return (
		<div>
			{ info }
		</div>
	);
};

export default Profile;