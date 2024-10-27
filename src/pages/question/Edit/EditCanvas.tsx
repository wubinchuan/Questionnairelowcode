import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import QuestionInput from '../../../components/QuestionComponent/QuestionInput/Component';
import QustionTitle from '../../../components/QuestionComponent/QuestionTitle/Component';
import style from './editCanvas.module.scss';
import { Spin } from 'antd';
import { ComponentConfType, getComponentByType } from '../../../components/QuestionComponent';
import useGetCanvasData from '../../../hooks/useGetCanvasDate';
import { changeSeletedId, ComponentInfoType, moveList } from '../../../store/componentsReducer';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import uselistenKeyPress from '../../../hooks/useBindCanvasKeyPress';
import SortableContainer from '../../../components/DragSortable/SortableContainer';
import SortableItem from '../../../components/DragSortable/SortableItem';
type PropsType = {
	loading: boolean;
};
function getComponent(item: ComponentInfoType) {
	const { type, props } = item;
	const ComponentConf: ComponentConfType | undefined = getComponentByType(type);
	if (!ComponentConf) {
		return;
	}
	const { Component } = ComponentConf;
	return <Component {...props} />;
}
const EditCanvas: FC<PropsType> = function (props) {
	const { loading } = props;
	const { componentList, selectedId } = useGetCanvasData();
	const dispatch = useDispatch();
	function updateComponentid(event: MouseEvent, id: string) {
		event?.stopPropagation();
		dispatch(changeSeletedId(id));
	}

	if (loading) {
		return (
			<div style={{ marginTop: '100px', textAlign: 'center' }}>
				<Spin />;
			</div>
		);
	}
	function handleDragEnd(oldindex: number, newindex: number) {
		dispatch(moveList({ oldindex, newindex }));
	}
	return (
		<SortableContainer items={componentList.map((item) => ({ ...item, id: item.fe_id }))} onGragEnd={handleDragEnd}>
			<div className={style.canvas}>
				{componentList
					.filter((item: any) => !item.isHidden)
					.map((item: ComponentInfoType) => {
						const { fe_id, isCheckd } = item!;
						const wrapperDefaultClassName = style['component-warpper'];
						const lock = style['lock'];
						const warpperClassName = classNames({
							[wrapperDefaultClassName]: true,
							[lock]: isCheckd
						});
						return (
							<SortableItem key={item.fe_id} id={item.fe_id}>
								<div
									className={warpperClassName}
									onClick={(e) => updateComponentid(e as any, item.fe_id)}
									style={{ border: selectedId === item.fe_id ? '1px solid skyblue' : '' }}
								>
									<div className={style.component}>{getComponent(item)}</div>
								</div>
							</SortableItem>
						);
					})}
			</div>
		</SortableContainer>
	);
};

export default memo(EditCanvas);
EditCanvas.displayName = 'EditCanvas';
