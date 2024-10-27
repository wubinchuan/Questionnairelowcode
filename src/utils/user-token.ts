const KEY = 'token';
export function getToken(): string {
	return localStorage.getItem(KEY) || '';
}
export function removeToken() {
	localStorage.removeItem(KEY);
}
export function setToken(token: string) {
	localStorage.setItem(KEY, token);
}
