import { produce } from 'immer';
import { memo, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import type { FC } from 'react';
import Questionnaire from '../../components/Questionnaire';
import { title } from 'process';
import { Empty, Spin, Typography } from 'antd';
import style from '../../components/common.module.scss';
import ListSearch from '../../components/ListSearch';
import { useDebounce, useDebounceFn, useRequest } from 'ahooks';
import { getQuestionListService } from '../../services/question';
import { useQuestionlist } from '../../hooks/useQuestionListData';
import { useSearchParams } from 'react-router-dom';
const { Title } = Typography;
export interface IProps {
	children?: ReactElement;
}

const List: FC<IProps> = function (props) {
	const [isinit, setinit] = useState(false);
	const loadmoreref = useRef<HTMLDivElement>(null);
	const [list, setlist] = useState<any[]>([]);
	const [page, setPage] = useState(1);
	const [total, settotal] = useState(0);
	const Ismore = total > list.length;
	const [searchparams] = useSearchParams();
	useEffect(() => {
		//keyword重新加载
		setPage(1);
		setlist([]);
		load();
	}, [searchparams.get('keyword')]);
	const { loading, run: load } = useRequest(
		async () => {
			//页号，页大小，关键字
			const res = await getQuestionListService({
				page: page,
				pageSize: 10,
				keyword: searchparams.get('keyword') || ''
			});
			return res;
		},
		{
			manual: true,
			onSuccess(result: any) {
				console.log(result, 'aa');
				const { list: morelist = [], total: moretotal = 0 } = result;
				setlist([...list, ...morelist]);
				setPage(page + 1);
				settotal(moretotal);
			}
		}
	);
	const { run: tryloadMore } = useDebounceFn(
		() => {
			const elem = loadmoreref.current;
			if (elem == null) return;
			const domRect = elem.getBoundingClientRect();
			if (domRect == null) return;
			const { bottom } = domRect;
			if (bottom <= document.documentElement.clientHeight) {
				load();
				setinit(true);
			}
		},
		{
			wait: 500
		}
	);
	const loadingresult = useMemo(() => {
		if (loading) {
			return <Spin />;
		} else {
			if (!Ismore && isinit) return <span>已经到底啦</span>;
			if (total === 0 && isinit) return <Empty />;
			if (list.length === 0 && isinit) return <Empty />;
		}

		return isinit && <span>下拉加载更多...</span>;
	}, [loading, Ismore, isinit]);
	//keyword重新加载需要保留
	useEffect(() => {
		document.addEventListener('scroll', tryloadMore);
		return () => {
			document.removeEventListener('scroll', tryloadMore);
		};
	}, [searchparams]);
	useEffect(() => {
		tryloadMore();
	}, [searchparams]);

	return (
		<>
			<div className={style.head}>
				<div>
					<Title level={3}>问卷列表</Title>
				</div>
				<div>
					<ListSearch />
				</div>
			</div>
			<div className="App">
				{list.length !== 0 && list.map((itme: any) => <Questionnaire key={itme._id} {...itme} />)}
				<div ref={loadmoreref} style={{ textAlign: 'center', marginTop: '30px' }}>
					{loadingresult}
				</div>
			</div>
		</>
	);
};

export default memo(List);
