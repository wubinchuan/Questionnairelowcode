import { useRequest } from 'ahooks';
import { memo, ReactElement, useState } from 'react';
import type { FC } from 'react';
import React from 'react';
import { getStatList } from '../../../services/stat';
import { useParams } from 'react-router-dom';
import { Pagination, Spin, Table } from 'antd';
import useGetCanvasData from '../../../hooks/useGetCanvasDate';
export interface IProps {
	children?: ReactElement;
	seletedId: string;
	setSelected: (id: string) => void;
	setSelectedType: (type: string) => void;
}
const PageStat: FC<IProps> = function (props) {
	const { seletedId, setSelected, setSelectedType } = props;
	const { id = '' } = useParams();
	const [total, settotal] = useState(0);
	const [list, setlist] = useState([]);
	const [page, setpage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const { loading } = useRequest(
		async () => {
			const res = getStatList(id, { page: 1, pagesize: 10 });
			return res;
		},
		{
			refreshDeps: [id, page, pageSize],
			onSuccess(result: any) {
				const { total, list } = result;
				settotal(total);
				setlist(list);
			}
		}
	);
	const { componentList } = useGetCanvasData();
	const datasource = list.map((item: any) => ({ ...item, key: item._id }));
	const tableConfig = componentList.map((item) => {
		const { fe_id, props, title } = item;
		const name = props!.title || title;
		return {
			dataIndex: fe_id,
			title: (
				<div style={{ cursor: 'pointer' }} onClick={() => setSelected(fe_id)}>
					<span style={{ color: seletedId === fe_id ? 'skyblue' : 'inherit' }}>{name}</span>
				</div>
			)
		};
	});
	const TableElem = (
		<>
			<Table columns={tableConfig} dataSource={datasource} pagination={false}></Table>
			<div>
				<Pagination
					total={total}
					defaultPageSize={pageSize}
					defaultCurrent={page}
					onChange={(page) => setpage(page)}
					onShowSizeChange={(page, pageSize) => {
						setpage(page);
						setPageSize(pageSize);
					}}
				/>
			</div>
		</>
	);
	return <div>{loading ? <Spin /> : TableElem}</div>;
};

export default memo(PageStat);
PageStat.displayName = 'PageStat';
