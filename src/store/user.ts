import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getuserinfo } from '../services/user';

export type userinfoType = {
	username: string;
	nickname?: string;
};
export const fetchuserinfo = createAsyncThunk('fetchuserinfo', async (payload, { getState, dispatch }) => {
	const res = await getuserinfo();
	dispatch(loginReducer(res));
});
const initialState: userinfoType = { username: '', nickname: '' };
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginReducer(state, { payload }) {
			return payload;
		},
		logoutReducer: () => initialState
	}
});
export default userSlice.reducer;
export const { loginReducer, logoutReducer } = userSlice.actions;
