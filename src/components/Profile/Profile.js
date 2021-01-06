import React, { useState, useEffect } from 'react';

import axios from '../../axios/authInstance';

const Profile = (props) => {
	let [info, setInfo] = useState('Loading...');

	useEffect(() => {
		axios.get('/me', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('access_token')
			}
		})
			.then(response => {
				setInfo(response.data.body.message);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	return (
		<div>
			{ info }
		</div>
	);
};

export default Profile;