import { configureStore } from '@reduxjs/toolkit';
import user, { userinfoType } from './user';
import componentsReducer from './componentsReducer';
import type { ComponentStateType } from './componentsReducer/index';
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';
import PageinfoReducer, { PageInfo } from './Pageinfo';
export type StateType = {
	user: userinfoType;
	component: StateWithHistory<ComponentStateType>; //增加undo
	pageinfo: PageInfo;
};
const store = configureStore({
	reducer: {
		user: user,
		component: undoable(componentsReducer, {
			limit: 20,
			filter: excludeAction([
				'component/resetComponents',
				'component/changeSeletedId',
				'component/seletedNextComponent',
				'component/seletedPrevComponent'
			])
		}),
		pageinfo: PageinfoReducer
		// reducers:{}
	}
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
