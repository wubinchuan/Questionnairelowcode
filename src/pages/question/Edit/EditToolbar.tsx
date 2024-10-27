import {
	BlockOutlined,
	CodepenOutlined,
	CopyOutlined,
	DeleteOutlined,
	DownCircleFilled,
	LockOutlined,
	RedoOutlined,
	UndoOutlined,
	UnlockFilled,
	UpCircleFilled
} from '@ant-design/icons';
import { Button, message, Space, Tooltip } from 'antd';
import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
	ComponentInfoType,
	copySelectdComponent,
	deleteComponent,
	hiddenComponent,
	lockedComponent,
	moveList,
	pasteComponent
} from '../../../store/componentsReducer';
import useGetCanvasData from '../../../hooks/useGetCanvasDate';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
export interface IProps {
	children?: ReactElement;
}
const EditToolbar: FC<IProps> = function (props) {
	const { selectedComponent, selectedId, componentList, copyComponent } = useGetCanvasData();
	const index = componentList.findIndex((item) => item.fe_id === selectedId);
	const islast = index + 1 >= componentList.length;
	const isone = index <= 0;
	const dispatch = useDispatch();
	function deleteComponetS() {
		dispatch(deleteComponent());
		message.success('删除成功');
	}
	// 隐藏
	function hiddenComponetS() {
		dispatch(hiddenComponent(true));
	}
	function lockedComponetS() {
		dispatch(lockedComponent(!selectedComponent?.isCheckd));
	}
	function paste() {
		if (selectedComponent) {
			dispatch(copySelectdComponent());
		} else {
			message.error('请先选择一个组件');
		}
	}
	function copy() {
		if (copyComponent) {
			dispatch(pasteComponent());
		} else {
			message.error('请先复制一个组件');
		}
	}
	function downmove() {
		dispatch(moveList({ oldindex: index, newindex: index - 1 }));
	}
	function upmove() {
		dispatch(moveList({ oldindex: index, newindex: index + 1 }));
	}
	function undo() {
		console.log(undo);
		dispatch(UndoActionCreators.undo());
	}
	function redo() {
		dispatch(UndoActionCreators.redo());
	}
	return (
		<Space>
			<Tooltip title="删除">
				<Button shape="circle" onClick={deleteComponetS} icon={<DeleteOutlined />}></Button>
			</Tooltip>
			<Tooltip title="隐藏">
				<Button shape="circle" onClick={hiddenComponetS} icon={<CodepenOutlined />}></Button>
			</Tooltip>
			<Tooltip title="锁定">
				<Button
					shape="circle"
					type={selectedComponent?.isCheckd ? 'primary' : 'default'}
					onClick={lockedComponetS}
					icon={selectedComponent?.isCheckd ? <LockOutlined twoToneColor="#eb2f96" /> : <UnlockFilled />}
				></Button>
			</Tooltip>
			<Tooltip title="复制">
				<Button shape="circle" onClick={paste} icon={<CopyOutlined />}></Button>
			</Tooltip>
			<Tooltip title="粘贴">
				<Button
					shape="circle"
					disabled={copyComponent === undefined}
					onClick={copy}
					icon={<BlockOutlined />}
				></Button>
			</Tooltip>
			<Tooltip title="上移">
				<Button shape="circle" disabled={isone} onClick={downmove} icon={<UpCircleFilled />}></Button>
			</Tooltip>
			<Tooltip title="下移">
				<Button shape="circle" disabled={islast} onClick={upmove} icon={<DownCircleFilled />}></Button>
			</Tooltip>
			<Tooltip title="撤销">
				<Button shape="circle" onClick={undo} icon={<UndoOutlined />}></Button>
			</Tooltip>
			<Tooltip title="重做">
				<Button shape="circle" onClick={redo} icon={<RedoOutlined />}></Button>
			</Tooltip>
		</Space>
	);
};

export default EditToolbar;
