import { memo, ReactElement, useState } from 'react';
import type { FC } from 'react';
import React from 'react';
import style from './EditHeader.module.scss';
import { Button, message, Space, Typography } from 'antd';
import { LeftOutlined, Loading3QuartersOutlined, OpenAIFilled, OpenAIOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EditToolbar from './EditToolbar';
import { useGetInfo } from '../../../hooks/useGetPageData';
import useGetCanvasData from '../../../hooks/useGetCanvasDate';
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks';
import { updateQuestionService } from '../../../services/question';
const { Title } = Typography;
export interface IProps {
	children?: ReactElement;
}
const PageInfoTitle = () => {
	const { title } = useGetInfo();
	const [isupdate, setisupdate] = useState(false);
	return (
		<Space>
			<Title style={{ fontSize: '16px', margin: '0 10px' }}>{title}</Title>
			<Button icon={<OpenAIOutlined />}></Button>
		</Space>
	);
};
const SaveBtn = () => {
	const { componentList } = useGetCanvasData();
	const pagesinfo = useGetInfo();
	const { id } = useParams();
	console.log();
	const { run, loading, error } = useRequest(
		async () => {
			if (!id) return;
			const res = await updateQuestionService(id, { ...pagesinfo, componentList });
			return res;
		},
		{ manual: true }
	);
	//自动保存
	useDebounceEffect(
		() => {
			if (!loading) {
				run();
			}
		},
		[componentList, pagesinfo],
		{
			wait: 1000 * 60 * 5
		}
	);
	useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
		event.preventDefault();
		run();
	});
	return (
		<Button onClick={run} loading={loading}>
			保存
		</Button>
	);
};
const IspubBtn = () => {
	const nav = useNavigate();
	const { componentList } = useGetCanvasData();
	const pagesinfo = useGetInfo();
	const { id } = useParams();
	console.log();
	const { run, loading, error } = useRequest(
		async () => {
			if (!id) return;
			const res = await updateQuestionService(id, { ...pagesinfo, componentList, isPublished: true });
			return res;
		},
		{
			manual: true,
			onSuccess() {
				message.success('发布成功');
				nav('/question/stat/' + id);
			}
		}
	);
	return (
		<Button type="primary" disabled={loading} onClick={run}>
			发布
		</Button>
	);
};
const EditHeader: FC<IProps> = function (props) {
	const nav = useNavigate();
	return (
		<div className={style.headerwarpper}>
			<div className={style.container}>
				<div className={style.left}>
					<Space>
						<Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}></Button>
						<Title level={3} style={{ margin: '0', fontSize: '16px' }}>
							返回
						</Title>
						<PageInfoTitle />
					</Space>
				</div>
				<div className={style.main}>
					<EditToolbar />
				</div>
				<div className={style.right}>
					<Space>
						<SaveBtn />
						<IspubBtn />
					</Space>
				</div>
			</div>
		</div>
	);
};

export default memo(EditHeader);
EditHeader.displayName = 'EditHeader';
