import { memo, ReactElement, useState } from 'react';
import type { FC } from 'react';
import React from 'react';
import { Outlet } from 'react-router';
import style from './ManageLayout.module.scss';
import { Button, Flex, Space, Divider, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { createQuestionService } from '../services/question';
import { useRequest } from 'ahooks';
export interface IProps {
	children?: ReactElement;
}
const ManageLayout: FC<IProps> = function (props) {
	const nav = useNavigate();
	const { pathname } = useLocation();

	const { loading, run: createQuestion } = useRequest(createQuestionService, {
		manual: true,
		onSuccess: (result: any) => {
			//前往问卷编辑页
			nav(`/question/edit/${result.id}`);
			message.success('创建问卷成功');
		}
	});
	return (
		<div className={style.container}>
			<div className={style.left}>
				<Space direction="vertical">
					<Button
						type="primary"
						size="large"
						icon={<PlusOutlined />}
						onClick={createQuestion}
						disabled={loading}
					>
						新建问卷
					</Button>
					<Divider style={{ borderTop: 'transparent' }} />
					<Button
						type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
						size="large"
						icon={<PlusOutlined />}
						onClick={() => nav('/manage/list')}
					>
						我的问卷
					</Button>

					<Button
						type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
						size="large"
						icon={<PlusOutlined />}
						onClick={() => nav('/manage/star')}
					>
						星标问卷
					</Button>

					<Button
						type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
						size="large"
						icon={<PlusOutlined />}
						onClick={() => nav('/manage/trash')}
					>
						回收站
					</Button>
				</Space>
			</div>
			<div className={style.rigth}>
				<Outlet />
			</div>
		</div>
	);
};

export default memo(ManageLayout);
ManageLayout.displayName = 'ManageLayout';
