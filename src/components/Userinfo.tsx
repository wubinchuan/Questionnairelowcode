import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
export interface IProps {
	children?: ReactElement;
}
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PAHT } from '../router';
import { useRequest } from 'ahooks';
import { getuserinfo } from '../services/user';
import { UserOutlined } from '@ant-design/icons';
import { removeToken } from '../utils/user-token';
import useGetuserinfo from '../hooks/useGetuserinfo';
import { useDispatch } from 'react-redux';
import { logoutReducer } from '../store/user';
const UserInfo: FC<IProps> = function (props) {
	const dispatch = useDispatch();
	// const { username, nickname } = useGetuserinfo();
	const nav = useNavigate();
	const { username, nickname } = useGetuserinfo();
	function checkoutuser() {
		//清除token，跳转登录页
		removeToken();
		dispatch(logoutReducer());
		nav(LOGIN_PAHT);
	}
	if (username) {
		return (
			<>
				<span>
					<UserOutlined />
					{username ?? nickname}
				</span>
				<span onClick={checkoutuser}>登出</span>
			</>
		);
	}
	return (
		<>
			<Link to={LOGIN_PAHT}>请登录</Link>
		</>
	);
};

export default memo(UserInfo);
UserInfo.displayName = 'UserInfo';
