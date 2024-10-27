import { memo, ReactElement, useState } from 'react';
import React from 'react';
import type { FC } from 'react';
import { useGetInfo } from '../../../hooks/useGetPageData';
import { useTitle } from 'ahooks';
import useGetCanvasData from '../../../hooks/useGetCanvasDate';
import style from './index.module.scss';
import { useQuestionData } from '../../../hooks/useQurstionData';
import { Button, Result, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import StatHeader from './StatHeader';
import ComponentList from './ComponentList';
import PageStat from './PageStat';
import ChatStat from './ChatStat';
// import { useQuestionData } from '../../../hooks/useQurstionData';
export interface IProps {
	children?: ReactElement;
}
const Stat: FC<IProps> = function (props) {
	// const { isLoading, questionData } = useQuestionData();
	const { componentList } = useGetCanvasData();
	const nav = useNavigate();
	const { loading } = useQuestionData();
	const { title, isPublished } = useGetInfo();
	useTitle('问卷统计- ' + title);
	const [selectedId, setseletedId] = useState('');
	const [selectedType, setseletedType] = useState('');
	function pageIsNot() {
		if (typeof isPublished === 'boolean' && !isPublished) {
			return (
				<Result
					subTitle="该问卷为发布"
					extra={
						<Button type="primary" onClick={() => nav(-1)}>
							回到首页
						</Button>
					}
				/>
			);
		} else {
			return (
				<>
					<div className={style.left}>
						<ComponentList
							seletedId={selectedId}
							setSelected={(id: string) => setseletedId(id)}
							setSelectedType={(type: string) => setseletedType(type)}
						/>
					</div>
					<div className={style.main}>
						<PageStat
							seletedId={selectedId}
							setSelected={(id: string) => setseletedId(id)}
							setSelectedType={(type: string) => setseletedType(type)}
						/>
					</div>
					<div className={style.right}>
						<ChatStat selectedComponentId={selectedId} selectedComponentType={selectedType} />
					</div>
				</>
			);
		}
	}

	return (
		<div className={style.container}>
			<div className={style.header}>{!loading && isPublished && <StatHeader />}</div>
			<div className={style['content-warpper']}>
				<div className={style.content}>
					{loading && <Spin style={{ flex: '1', marginTop: '80px' }} />}
					{!loading && pageIsNot()}
				</div>
			</div>
		</div>
	);
};

export default memo(Stat);
Stat.displayName = 'Stat';
