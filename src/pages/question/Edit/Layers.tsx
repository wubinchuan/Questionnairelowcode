import { memo, ReactElement, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import React from 'react';
import style from './Layers.module.scss';
import useGetCanvasData from '../../../hooks/useGetCanvasDate';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { changeSeletedId, moveList, updateSelectedTitle } from '../../../store/componentsReducer';
import { Button, Input } from 'antd';
import { EyeInvisibleFilled, LockOutlined } from '@ant-design/icons';
import SortableContainer from '../../../components/DragSortable/SortableContainer';
import SortableItem from '../../../components/DragSortable/SortableItem';

export interface IProps {
	children?: ReactElement;
}
const Layers: FC = function (props) {
	const { componentList = [], selectedId } = useGetCanvasData();
	const [selectedids, setSeletecids] = useState<string>('');
	const dispatch = useDispatch();

	function handleSelected(fe_id: string) {
		//不能选中被隐藏的组件
		const indexComponent = componentList.find((item) => item.fe_id === fe_id);
		if (indexComponent && indexComponent.isHidden) {
			return; //
		}
		//未选择则选中
		if (selectedId !== fe_id) {
			dispatch(changeSeletedId(fe_id));
			setSeletecids('');
			return;
		}
		//选中再次点击即修改标题
		setSeletecids(fe_id);
	}
	function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
		const newtitle = event.target.value?.trim();
		if (!newtitle || selectedids === '') return;
		console.log(newtitle);

		//派发action修改标题
		dispatch(updateSelectedTitle({ fe_id: selectedids, newtitle }));
	}
	function handleDragEnd(oldindex: number, newindex: number) {
		dispatch(moveList({ oldindex, newindex }));
	}
	return (
		<SortableContainer items={componentList.map((item) => ({ ...item, id: item.fe_id }))} onGragEnd={handleDragEnd}>
			{componentList.map((item) => {
				const itemClassName = style['item'];
				const itemActiveName = style['active'];
				const AllClassname = classNames({
					[itemClassName]: true,
					[itemActiveName]: selectedId === item.fe_id
				});
				return (
					<SortableItem key={item.fe_id} id={item.fe_id}>
						<div className={AllClassname}>
							<div className={style.left} onClick={() => handleSelected(item.fe_id)}>
								{selectedids !== item.fe_id && (item.props.title || item.title)}
								{selectedids === item.fe_id && (
									<Input
										onChange={handleTitleChange}
										onBlur={() => setSeletecids('')}
										value={item.props.title}
										placeholder="请输入修改名称"
									/>
								)}
							</div>
							<div className={style.right}>
								<Button
									size="small"
									shape="circle"
									type={item.isHidden ? 'primary' : 'link'}
									icon={<EyeInvisibleFilled />}
								></Button>
								<Button
									type={item.isCheckd ? 'primary' : 'link'}
									size="small"
									shape="circle"
									icon={<LockOutlined />}
									style={{ marginLeft: '5px' }}
								></Button>
							</div>
						</div>
					</SortableItem>
				);
			})}
		</SortableContainer>
	);
};

export default memo(Layers);
Layers.displayName = 'Layers';
