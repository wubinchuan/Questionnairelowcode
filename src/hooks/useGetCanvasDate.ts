import { shallowEqual, useSelector, UseSelector } from 'react-redux';
import { StateType } from '../store';
import { ComponentStateType } from '../store/componentsReducer';
function useGetCanvasData() {
	//获取到画布的数据并返回
	const { componentList, selectedId, copyComponent } = useSelector<StateType, ComponentStateType>(
		(state) => ({
			componentList: state.component.present.componentList,
			selectedId: state.component.present.selectedId,
			copyComponent: state.component.present.copyComponent
		}),
		shallowEqual
	);
	const selectedComponent = componentList.find((item) => item.fe_id === selectedId);
	return { componentList, selectedId, selectedComponent, copyComponent };
}
export default useGetCanvasData;
