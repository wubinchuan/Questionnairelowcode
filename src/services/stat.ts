import axios from './ajax';

export async function getStatList(questionId: string, params: { page: number; pagesize: number }) {
	const res = await axios.get(`/api/stat/${questionId}`, { params });
	return res;
}
export async function getStatcount(questionId: string, componentId: string) {
	const res = await axios.get(`/api/stat/${questionId}/${componentId}`);
	return res;
}
