import { memo, ReactElement, useEffect, useState } from 'react';
import React from 'react';
import type { FC } from 'react';
import { Space, Typography } from 'antd';
import style from './Logo.module.scss';
import { Link } from 'react-router-dom';
const { Title } = Typography;
import { FormOutlined } from '@ant-design/icons';
import useGetuserinfo from '../hooks/useGetuserinfo';
import { HOME_PATH, MANAGE_INDEX_PATH } from '../router';
export interface IProps {
	children?: ReactElement;
}

const Logo: FC<IProps> = function (props) {
	const { username } = useGetuserinfo();
	const [pathname, setpathname] = useState(HOME_PATH);
	useEffect(() => {
		if (username) {
			setpathname(MANAGE_INDEX_PATH);
		}
	}, [username]);
	return (
		<Link to={pathname}>
			<Space className={style.container}>
				<Title className={style.titletext}>
					<FormOutlined />
				</Title>
				<Title className={style.titletext}>小牛问卷</Title>
			</Space>
		</Link>
	);
};

export default memo(Logo);
Logo.displayName = 'Logo';
