import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import { delectQurstionService } from '../services/question';
import {
	copySelectdComponent,
	deleteComponent,
	pasteComponent,
	seletedNextComponent,
	seletedPrevComponent
} from '../store/componentsReducer';
import { ActionCreators } from 'redux-undo';

function isActiveElementValid() {
	const activeElement = document.activeElement;
	console.log(activeElement);

	if (activeElement instanceof HTMLDivElement) return true; //我们在输入框删除或者操作的时候不触发组件的操作
	return false;
}
function uselistenKeyPress() {
	const dispatch = useDispatch();
	useKeyPress(['backspace', 'delete'], () => {
		//删除当前选中的组件
		if (isActiveElementValid()) {
			dispatch(deleteComponent());
		}
	});
	useKeyPress(['mate.c', 'ctrl.c'], () => {
		//删除当前选中的组件
		if (isActiveElementValid()) {
			dispatch(copySelectdComponent());
		}
	});
	useKeyPress(['mate.v', 'ctrl.v'], () => {
		//删除当前选中的组件
		if (isActiveElementValid()) {
			dispatch(pasteComponent());
		}
	});
	useKeyPress('uparrow', () => {
		//删除当前选中的组件
		if (isActiveElementValid()) {
			dispatch(seletedPrevComponent());
		}
	});
	useKeyPress('downarrow', () => {
		//删除当前选中的组件
		if (isActiveElementValid()) {
			dispatch(seletedNextComponent());
		}
	});
	useKeyPress(
		['ctrl.z', 'mate.z'],
		() => {
			dispatch(ActionCreators.undo());
		},
		{
			exactMatch: true //因为'ctrl.shift.z'也包含ctrl.z
		}
	);
	useKeyPress(['ctrl.shift.z', 'mate.shift.z'], () => {
		//删除当前选中的组件
		dispatch(ActionCreators.redo());
	});
}
export default uselistenKeyPress;
