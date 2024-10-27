import React, { useEffect } from 'react';
import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
const { Title, Paragraph } = Typography;
import style from './home.module.scss';
// import '../_mock/index.ts';
import { MANAGE_INDEX_PATH } from '../router';

import axios from 'axios';

export interface IProps {
	children?: ReactElement;
}
const Home: FC<IProps> = function (props) {
	useEffect(() => {
		//只能劫持XmlHttprequest，无法劫持fetch
		// axios.get('/api/user').then((res) => console.log(res.data));
		axios.get('/api/test').then((res) => console.log(res));
	}, []);
	const navigate = useNavigate();
	function clickhandler() {
		navigate('/login');
	}
	return (
		<div className={style.container}>
			<div className={style.info}>
				<Title>问卷调查 | 在线统计</Title>
				<Paragraph>已累计创建问卷 100 份, 发布问卷 90 份</Paragraph>
				<div>
					<Button type="primary" onClick={() => navigate(MANAGE_INDEX_PATH)}>
						开始使用
					</Button>
				</div>
			</div>
		</div>
	);
};

export default memo(Home);
Home.displayName = 'Home';
