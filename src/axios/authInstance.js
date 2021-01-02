import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://142.93.134.108:1111'
});

export default instance;