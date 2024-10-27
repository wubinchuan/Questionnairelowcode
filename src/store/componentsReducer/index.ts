import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import type { ComponentPropsType } from '../../components/QuestionComponent';
import { produce } from 'immer';
import { start } from 'repl';
import { resetseletedid } from './utils';
import cloneDeep from 'lodash.clonedeep';
import { arrayMove } from '@dnd-kit/sortable';
export type ComponentInfoType = {
	fe_id: string;
	type: string;
	title: string;
	isHidden?: boolean;
	isCheckd?: boolean;
	props: ComponentPropsType;
};
export type ComponentStateType = {
	componentList: ComponentInfoType[];
	selectedId?: string;
	copyComponent?: ComponentInfoType | null;
};
const INIT_STATE: ComponentStateType = {
	selectedId: '',
	componentList: [],
	copyComponent: null
};

const componentSlice = createSlice({
	name: 'component',
	initialState: INIT_STATE,
	reducers: {
		resetComponents(state, action: PayloadAction<ComponentStateType>) {
			return action.payload;
		},
		changeSeletedId(state, { payload }) {
			return { ...state, selectedId: payload };
		},
		addComponent: produce((draft: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
			const newComponent = action.payload;
			const { selectedId } = draft;
			const index = draft.componentList.findIndex((item) => item.fe_id === selectedId);

			if (index < 0) {
				draft.componentList.push(newComponent);
			} else {
				draft.componentList.splice(index + 1, 0, newComponent);
			}
			draft.selectedId = newComponent.fe_id;
		}),
		updateComponentProps: produce(
			(draft: ComponentStateType, action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>) => {
				const { fe_id, newProps } = action.payload;
				const index = draft.componentList.findIndex((item) => item.fe_id === fe_id);
				if (index < 0) return;
				draft.componentList[index].props = newProps;
			}
		),
		deleteComponent: produce((draft: ComponentStateType, action: PayloadAction) => {
			const { selectedId, componentList } = draft;
			if (selectedId === '') return;
			const seletedIds = resetseletedid(selectedId!, componentList);
			draft.selectedId = seletedIds;
			draft.componentList = draft.componentList.filter((item) => item.fe_id !== selectedId);
		}),
		hiddenComponent: produce((draft: ComponentStateType, action: PayloadAction<boolean>) => {
			const { selectedId, componentList } = draft;
			if (selectedId === '') return;
			const index = componentList.findIndex((item) => item.fe_id === selectedId);
			if (index < 0) return;
			let seletedIds = resetseletedid(selectedId!, componentList);
			if (action.payload) {
				seletedIds = resetseletedid(selectedId!, componentList);
			} else {
				seletedIds = selectedId!;
			}
			draft.selectedId = seletedIds;
			draft.componentList[index].isHidden = !draft.componentList[index].isHidden!;
		}),
		lockedComponent: produce((draft: ComponentStateType, action: PayloadAction<boolean>) => {
			const { selectedId, componentList } = draft;
			if (selectedId === '') return;
			const index = componentList.findIndex((item) => item.fe_id === selectedId);
			if (index < 0) return;
			draft.componentList[index].isCheckd = !draft.componentList[index].isCheckd!;
		}),
		//拷贝当前的组件
		copySelectdComponent: produce((draft: ComponentStateType) => {
			const { selectedId, componentList } = draft;
			if (selectedId === '') return;
			const index = componentList.findIndex((item) => item.fe_id === selectedId);
			if (index < 0) return;
			draft.copyComponent = cloneDeep(componentList[index]);
		}),
		pasteComponent: produce((draft: ComponentStateType) => {
			const { selectedId, componentList, copyComponent } = draft;
			if (copyComponent === null) return;
			//需要把fe_id重新生成
			const newComponent = cloneDeep(copyComponent);
			newComponent!.fe_id = nanoid();
			const index = draft.componentList.findIndex((item) => item.fe_id === selectedId);

			if (index < 0) {
				draft.componentList.push(newComponent!);
			} else {
				draft.componentList.splice(index + 1, 0, newComponent!);
			}
			draft.selectedId = newComponent!.fe_id;
		}),
		seletedPrevComponent: produce((draft: ComponentStateType) => {
			const { selectedId, componentList } = draft;
			if (selectedId === '') return;
			const index = componentList.findIndex((item) => item.fe_id === selectedId);
			if (index < 0 || index === 0) return;
			draft.selectedId = componentList[index - 1].fe_id;
		}),
		seletedNextComponent: produce((draft: ComponentStateType) => {
			const { selectedId, componentList } = draft;
			if (selectedId === '') return;
			const index = componentList.findIndex((item) => item.fe_id === selectedId);
			if (index < 0 || index + 1 == componentList.length) return;
			draft.selectedId = componentList[index + 1].fe_id;
		}),
		updateSelectedTitle: produce(
			(draft: ComponentStateType, action: PayloadAction<{ fe_id: string; newtitle: string }>) => {
				const { fe_id, newtitle } = action.payload;
				const comp = draft.componentList.find((item) => item.fe_id === fe_id);
				if (comp) comp.props.title = newtitle;
			}
		),
		moveList: produce(
			(draft: ComponentStateType, action: PayloadAction<{ oldindex: number; newindex: number }>) => {
				const { oldindex, newindex } = action.payload;
				const { componentList: prelist } = draft;
				draft.componentList = arrayMove(prelist, oldindex, newindex);
			}
		)
	}
});
export default componentSlice.reducer;
export const {
	resetComponents,
	changeSeletedId,
	hiddenComponent,
	addComponent,
	updateComponentProps,
	deleteComponent,
	lockedComponent,
	copySelectdComponent,
	pasteComponent,
	seletedNextComponent,
	seletedPrevComponent,
	updateSelectedTitle,
	moveList
} = componentSlice.actions;
