import { Pagination } from 'antd';
import { memo, ReactElement, useEffect, useState } from 'react';
import type { FC } from 'react';
import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
export interface IProps {
	children?: ReactElement;
	total: number;
}
const ListPage: FC<IProps> = function (props) {
	const [current, sercurrent] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [searchparams] = useSearchParams();
	const nav = useNavigate();
	const { pathname } = useLocation();
	useEffect(() => {
		const current = parseInt(searchparams.get('page') || '') || 1;
		const pageSize = parseInt(searchparams.get('pageSize') || '') || 10;
		sercurrent(current);
		setPageSize(pageSize);
	}, [searchparams]);
	function handlechange(page: number, pageSize: number) {
		setPageSize(pageSize);
		sercurrent(page);
		searchparams.set('page', page + '');
		searchparams.set('pageSize', pageSize + '');

		nav({
			pathname,
			search: searchparams.toString()
		});
	}
	return (
		<Pagination
			total={props.total}
			current={current}
			pageSize={pageSize}
			align="end"
			showSizeChanger
			showQuickJumper
			onChange={handlechange}
		/>
	);
};

export default memo(ListPage);
ListPage.displayName = 'ListPage';
