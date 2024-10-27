import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import usegetuserinfoData from '../hooks/useLoadUserData';
import useNeeduserinfo from '../hooks/useneeduserinfo';
import { Spin } from 'antd';
export interface IProps {
	children?: ReactElement;
}
const QuestionLayout: FC<IProps> = function (props) {
	const waiting = usegetuserinfoData();
	useNeeduserinfo(waiting);
	return (
		<div style={{ height: '100vh' }}>
			{waiting ? (
				<Spin size="large" style={{ margin: '120px auto', width: '100%', display: 'inline-block' }} />
			) : (
				<Outlet />
			)}
		</div>
	);
};

export default memo(QuestionLayout);
QuestionLayout.displayName = 'QuestionLayout';
