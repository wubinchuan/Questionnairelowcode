import { memo, ReactElement, useState } from 'react';
import type { FC } from 'react';
import React from 'react';
import { Typography, Empty, Table, Tag, Space, Button, Modal, message, Spin } from 'antd';
import style from '../../components/common.module.scss';
import Questionnaire from '../../components/Questionnaire';
import { produce } from 'immer';
import { title } from 'process';
import { ExclamationCircleFilled } from '@ant-design/icons';
import ListSearch from '../../components/ListSearch';
import { useQuestionlist } from '../../hooks/useQuestionListData';
import ListPage from '../../components/ListPage';
import { useRequest } from 'ahooks';
import { delectQurstionService, updateQuestionService } from '../../services/question';
const { Title } = Typography;
const { confirm } = Modal;
export interface IProps {
	children?: ReactElement;
}
const Trash: FC<IProps> = function (props) {
	const { loading, data = {}, error, refresh } = useQuestionlist({ isDeleted: true });
	const { list = [], total = 0 } = data as any;
	const cloums = [
		{ title: '标题', dataIndex: 'title' },
		{
			title: '状态',
			dataIndex: 'isPublished',
			render: (isPublished: boolean) => {
				return isPublished ? <Tag color="skyblue">已发布</Tag> : <Tag>未发布</Tag>;
			}
		},
		{ title: '答卷', dataIndex: 'answerCount' },
		{ title: '创建时间', dataIndex: 'createdAt' }
	];
	const [seletedids, setseletedids] = useState<string[]>([]);
	//批量恢复
	const { run: rallbackrun, loading: rallbackloading } = useRequest(
		async () => {
			for await (const id of seletedids) {
				return await updateQuestionService(id, { isDeleted: false });
			}
		},
		{
			manual: true,
			debounceWait: 100,
			onSuccess: (result) => {
				console.log(result);

				refresh();
				setseletedids([]);
				message.success('恢复成功');
			}
		}
	);
	const { run: delerun, loading: deleload } = useRequest(
		async () => {
			for await (const id of seletedids) {
				return await delectQurstionService(id);
			}
		},
		{
			manual: true,
			onSuccess: (result) => {
				console.log(result);

				refresh();
				setseletedids([]);
				message.success('删除成功');
			}
		}
	);

	//批量删除
	function del() {
		confirm({
			title: '是否确认删除？',
			content: '删除后将无法恢复',
			icon: <ExclamationCircleFilled />,
			onOk() {
				delerun();
			}
		});
	}
	const TableElm = (
		<>
			<Space style={{ marginBottom: '10px' }}>
				<Button disabled={seletedids.length === 0} onClick={rallbackrun}>
					恢复
				</Button>
				<Button danger onClick={del}>
					删除
				</Button>
			</Space>
			<Table
				columns={cloums}
				dataSource={list}
				pagination={false}
				rowKey={(q) => q._id}
				rowSelection={{
					type: 'checkbox',
					onChange: (selectedRowKeys) => {
						setseletedids(selectedRowKeys as string[]);
					}
				}}
			></Table>
		</>
	);
	return (
		<>
			{loading ? (
				<Spin />
			) : (
				<>
					<div className={style.head}>
						<div>
							<Title level={3}>回收站</Title>
						</div>
						<div>
							<ListSearch />
						</div>
					</div>
					<div>
						{!loading && list.length === 0 ? (
							<Empty description="暂无数据" style={{ marginTop: '100px' }} />
						) : (
							TableElm
						)}
					</div>
					<div>
						<ListPage total={total} />
					</div>
				</>
			)}
		</>
	);
};

export default memo(Trash);
Trash.displayName = 'Trash';
