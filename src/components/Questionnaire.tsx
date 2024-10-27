import { memo, ReactElement, useState } from 'react';
import type { FC } from 'react';
import React from 'react';
import style from './common.module.scss';
import { Button, Space } from 'antd';
import { duplicateQurstionService, updateQuestionService } from '../services/question';
import { Typography, Divider, Tag, Popconfirm, message, Modal } from 'antd';
import {
	CopyOutlined,
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
	LineChartOutlined,
	StarOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
const { confirm } = Modal;
const { propTypes, Title } = Typography;
export interface IProps {
	children?: ReactElement;
	_id: number;
	title: string;
	isPublished: boolean;
	answerCount: number;
	createdAt: string;
	isStat: boolean;
	add?: () => void;
	update?: (id: any) => void;
	deletedata?: (id: any) => void;
}
const Question: FC<IProps> = function (props) {
	const nav = useNavigate();
	const { _id, title, isPublished, answerCount, createdAt, isStat } = props;
	const [Stat, setisStat] = useState(isStat);
	function copyhandle() {
		message.success('复制成功');
	}
	const { run: updataStat, loading: statloading } = useRequest(
		async () => {
			const res = await updateQuestionService(_id + '', { isStat: !isStat });
			return res;
		},
		{
			manual: true,
			onSuccess: () => {
				setisStat(!isStat);
				message.success('修改成功');
			}
		}
	);
	const { loading: duplicatelod, run: duplicaterun } = useRequest(
		async () => {
			const res = await duplicateQurstionService(_id + '');
			return res;
		},
		{
			manual: true,
			onSuccess(result: any) {
				nav(`/question/edit/${result._id}`);
				message.success('复制成功');
			}
		}
	);
	const [Deleted, setisDeleted] = useState(false);
	const { run: deleterun, loading: deleteload } = useRequest(
		async () => {
			const res = await updateQuestionService(_id + '', { isDeleted: true });
			return res;
		},
		{
			manual: true,
			onSuccess: () => {
				setisDeleted(true);
				message.success('删除成功');
			}
		}
	);
	function del() {
		confirm({
			title: '确定删除该问卷?',
			content: '删除后无法恢复',
			icon: <ExclamationCircleOutlined />,
			okText: '删除',
			cancelText: '取消',
			onOk: () => {
				deleterun();
			}
		});
	}
	if (Deleted) {
		return null;
	}
	return (
		<div>
			<div key={_id} className={style.container}>
				<div className={style.top}>
					<div className={style.left}>
						<Link
							to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
							className={style.title}
						>
							<Space>
								{Stat && <StarOutlined style={{ color: 'skyblue' }} />}
								{title}
							</Space>
						</Link>
					</div>
					<div className={style.right}>
						<Space>
							{isPublished ? <Tag color="skyblue">已发布</Tag> : <Tag>未发布</Tag>}
							<span>答案:{answerCount}</span>
							<span>{createdAt}</span>
						</Space>
					</div>
				</div>
				<Divider style={{ margin: '12px' }} />
				<div className={style.bottom}>
					<div className={style.left}>
						<Button
							size="small"
							type="text"
							icon={<EditOutlined />}
							onClick={() => nav(`/question/edit/${_id}`)}
						>
							编辑问卷
						</Button>
						<Button
							size="small"
							type="text"
							icon={<LineChartOutlined />}
							onClick={() => nav(`/question/stat/${_id}`)}
							disabled={!isPublished}
						>
							数据统计
						</Button>
					</div>
					<div className={style.right}>
						<Space>
							<Button
								type="text"
								size="small"
								icon={<StarOutlined />}
								onClick={updataStat}
								disabled={statloading}
							>
								{Stat ? '取消标星' : '标星'}
							</Button>
							<Popconfirm
								title="确定复制该问卷?"
								okText="确认"
								cancelText="取消"
								onConfirm={duplicaterun}
							>
								<Button type="text" size="small" icon={<CopyOutlined />} disabled={duplicatelod}>
									复制
								</Button>
							</Popconfirm>
							<Button type="text" size="small" icon={<DeleteOutlined />} onClick={del}>
								删除
							</Button>
						</Space>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Question);
