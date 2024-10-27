import { memo, ReactElement, useState } from 'react';
import React from 'react';
import type { FC } from 'react';
import { Empty, Pagination, Spin, Typography } from 'antd';
import style from '../../components/common.module.scss';
import Questionnaire from '../../components/Questionnaire';
import { produce } from 'immer';
import ListSearch from '../../components/ListSearch';
import { useQuestionlist } from '../../hooks/useQuestionListData';
import ListPage from '../../components/ListPage';
const { Title } = Typography;
export interface IProps {
	children?: ReactElement;
}
const Star: FC<IProps> = function (props) {
	const { loading, data = {}, error } = useQuestionlist({ isStar: true });
	const { list = [], total = 0 } = data as any;

	return (
		<>
			<div className={style.head}>
				<div>
					<Title level={3}>星标问卷</Title>
				</div>
				<div>
					<ListSearch />
				</div>
			</div>
			<div>
				{loading && <Spin />}{' '}
				{!loading && list.length === 0 ? (
					<Empty />
				) : (
					list.map((itme: any) => <Questionnaire key={itme._id} {...itme} />)
				)}
			</div>
			<div style={{ textAlign: 'right', margin: '20px 0' }}>
				<ListPage total={total} />
			</div>
		</>
	);
};

export default memo(Star);
Star.displayName = 'Star';
