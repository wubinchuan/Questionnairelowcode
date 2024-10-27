import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import useGetCanvasData from '../../../hooks/useGetCanvasDate';
import { ComponentPropsType, getComponentByType } from '../../../components/QuestionComponent';
import { ComponentInfoType, updateComponentProps } from '../../../store/componentsReducer';
import { useDispatch } from 'react-redux';
export interface IProps {
	children?: ReactElement;
}
const Null: FC = () => {
	return <div style={{ textAlign: 'center' }}>未选择组件</div>;
};
const ComponentProp: FC<IProps> = function (prop) {
	const dispatch = useDispatch();
	const { selectedComponent } = useGetCanvasData();
	if (!selectedComponent) return <Null />;
	const { type, props, isCheckd, isHidden } = selectedComponent;
	const ComponentConf = getComponentByType(type);
	if (!ComponentConf) return <Null />;
	const { PropComponent } = ComponentConf;
	function handleChange(newProps: ComponentPropsType) {
		const { fe_id } = selectedComponent!;
		console.log('newnew', newProps);

		dispatch(updateComponentProps({ fe_id, newProps }));
		console.log(newProps);
	}
	return <PropComponent {...props} onChange={handleChange} disabled={isCheckd || isHidden} />;
};

export default memo(ComponentProp);
ComponentProp.displayName = 'ComponentProp';
