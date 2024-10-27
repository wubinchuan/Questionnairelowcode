import { createSlice } from '@reduxjs/toolkit';

export type PageInfo = {
	title: string;
	desc: string;
	css: string;
	js: string;
	isPublished?: boolean;
};

const initialState: PageInfo = {
	title: '',
	desc: '',
	css: '',
	js: ''
};
const pageinfoSlice = createSlice({
	name: 'pageinfo',
	initialState,
	reducers: {
		resetPageinfo(state, { payload }) {
			return payload;
		}
	}
});

export const { resetPageinfo } = pageinfoSlice.actions;
export default pageinfoSlice.reducer;
