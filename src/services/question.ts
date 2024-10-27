import axios from './ajax';
type searchOption = {
	keyword: string;
	isStar: boolean;
	isDeleted: boolean;
	page?: number;
	pageSize?: number;
};
export async function getQuestionService(id: string) {
	const res = await axios.get(`/api/question/${id}`);
	return res;
}
export async function createQuestionService() {
	const res = await axios.post('/api/question');
	return res;
}
export async function getQuestionListService(params: Partial<searchOption>) {
	const res = await axios.get('/api/question', { params });
	return res;
}
export async function updateQuestionService(id: string, obj: any) {
	const url = `/api/question/${id}`;
	const res = await axios.patch(url, obj);
	return res;
}
export async function duplicateQurstionService(id: string) {
	const url = `/api/question/duplicate/${id}`;
	const res = await axios.post(url);
	return res;
}
export async function delectQurstionService(id: string) {
	const url = `/api/question/delete/${id}`;
	const res = await axios.post(url);
	return res;
}
