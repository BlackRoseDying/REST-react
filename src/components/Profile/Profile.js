import React, { useState, useEffect } from 'react';

import axios from '../../axios/authInstance';

const Profile = (props) => {
	let [info, setInfo] = useState('Loading...');

	useEffect(() => {
		const interceptor = axios.interceptors.response.use(response => {
			if (response.data.statusCode === 200) return response;
			if (response.data.statusCode === 401) {
		      axios.post('/refresh', null, {
			      headers: {
				      Authorization: 'Bearer ' + localStorage.getItem('refresh_token')
			      }
		      })
			      .then(response => {
				      localStorage.setItem('access_token', response.data.body.access_token);
				      localStorage.setItem('refresh_token', response.data.body.refresh_token);
			      })
			      .catch(error => console.log(error))
			}
		});

		axios.get('/me', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('access_token')
			}
		})
			.then(response => {
				console.log(response);
				setInfo(response.data.body.message);
			})
			.catch(error => {
				console.log(error);
			});

		return () => {
			axios.interceptors.response.eject(interceptor);
		}
	}, []);

	return (
		<div>
			{ info }
		</div>
	);
};

export default Profile;