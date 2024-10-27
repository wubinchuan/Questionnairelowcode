import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import { Outlet } from 'react-router';
import { Layout, Flex } from 'antd';
import React from 'react';
const { Header, Content, Footer } = Layout;
import style from './MainLayout.module.scss';
import Logo from '../components/Logo';
import Userinfo from '../components/Userinfo';
import useGetuserinfo from '../hooks/useGetuserinfo';
import usegetuserinfoData from '../hooks/useLoadUserData';
import useNeeduserinfo from '../hooks/useneeduserinfo';
export interface IProps {
	children?: ReactElement;
}
const MainLayout: FC<IProps> = function (props) {
	const waiting = usegetuserinfoData();
	useNeeduserinfo(waiting);
	return (
		<Layout>
			<Header className={style.header}>
				<div className={style.left}>
					<Logo />
				</div>
				<div className={style.right}>
					<Userinfo />
				</div>
			</Header>
			<Content className={style.main}>{!waiting && <Outlet />}</Content>
			<Footer className={style.footer}>Footer</Footer>
		</Layout>
	);
};

export default memo(MainLayout);
MainLayout.displayName = 'MainLayout';
