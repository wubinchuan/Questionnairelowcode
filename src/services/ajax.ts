import { message } from 'antd';
import axios from 'axios';

const instance = axios.create({
	timeout: 5000
});
instance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token') ?? '';
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});
instance.interceptors.response.use((res) => {
	const resData = (res.data || {}) as ResType;
	const { errno, data, msg } = resData;
	console.log(data, 'ddd');

	if (errno !== 0) {
		message.error(msg);
	}
	return data as any;
});
export type ResType = {
	errno: number;
	data?: ResDataType;
	msg?: string;
};
export type ResDataType = {
	[key in string]: any;
};
export default instance;
