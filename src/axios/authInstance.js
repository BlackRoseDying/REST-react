import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://142.93.134.108:1111'
});

instance.interceptors.response.use(response => {
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

export default instance;