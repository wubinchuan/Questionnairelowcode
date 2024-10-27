import axios from './ajax';

export async function getuserinfo() {
	return await axios.get('/api/userinfo');
}
export async function userLogin(username: string, password: string) {
	const body = { username, password };
	return await axios.post('/api/userLogin', body);
}
export async function userRegister(username: string, password: string, nickname?: string) {
	const body: any = { username, password };
	if (nickname) body.nickname = nickname;
	return await axios.post('/api/userRegister', body);
}
