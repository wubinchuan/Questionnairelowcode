import { memo, ReactElement, useEffect, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import React from 'react';
import { Input } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../constant';
const { Search } = Input;
export interface IProps {
	children?: ReactElement;
}
const ListSearch: FC<IProps> = function (props) {
	const nav = useNavigate();
	const { pathname } = useLocation();
	const [searchParams] = useSearchParams();
	useEffect(() => {
		if (searchParams.get(LIST_SEARCH_PARAM_KEY)) {
			setvalue(searchParams.get(LIST_SEARCH_PARAM_KEY) || '');
		}
	}, [searchParams]);
	const [value, setvalue] = useState<string>('');
	function handlechange(event: ChangeEvent<HTMLInputElement>) {
		setvalue(event.target.value);
	}
	function handleSearch(value: string) {
		nav({
			pathname: pathname,
			search: `${LIST_SEARCH_PARAM_KEY}=${value}`
		});
	}
	return (
		<div>
			<Search
				placeholder="请输入搜索内容"
				allowClear
				onChange={handlechange}
				value={value}
				onSearch={handleSearch}
			/>
		</div>
	);
};

export default memo(ListSearch);
ListSearch.displayName = 'ListSearch';
