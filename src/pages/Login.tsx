import React, { useEffect } from 'react';
import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './register.module.scss';
import { Space, Typography, Input, Form, Button, Checkbox, message } from 'antd';
import { UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { userLogin } from '../services/user';
import { setToken } from '../utils/user-token';
import { MANAGE_INDEX_PATH } from '../router';

const { Title } = Typography;

export interface IProps {
	children?: ReactElement;
}
function remberuser(username: string, password: string) {
	localStorage.setItem('username', username);
	localStorage.setItem('password', password);
}
function deleteuser() {
	localStorage.removeItem('username');
	localStorage.removeItem('password');
}
function getuser() {
	const username = localStorage.getItem('username') ?? '';
	const password = localStorage.getItem('password') ?? '';
	return { username, password };
}
const Login: FC<IProps> = function (props) {
	const nav = useNavigate();
	const [form] = Form.useForm();
	useEffect(() => {
		const { username, password } = getuser();
		form.setFieldsValue({ username, password });
	}, []);
	const { loading, run: userlogin } = useRequest(
		async (username: string, password: string) => {
			const res = userLogin(username, password);
			return res;
		},
		{
			manual: true,
			onSuccess(res: any) {
				if (!res) message.error('登录失败');
				else {
					message.success('登录成功');
					setToken(res.token ?? '');
					nav(MANAGE_INDEX_PATH);
				}
			},
			onError(err) {
				message.error(err.message);
			}
		}
	);
	function onfinish(values: any) {
		const { username, password, rember } = values;
		if (rember) {
			remberuser(username, password);
		} else {
			deleteuser();
		}
		userlogin(username, password);
	}

	return (
		<div className={style.container}>
			<div className={style.info}>
				<div>
					<Space>
						<Title level={3}>
							<UserOutlined />
						</Title>
						<Title level={3}>登录</Title>
					</Space>
				</div>
				<Form
					onFinish={onfinish}
					labelCol={{ span: 6 }}
					initialValues={{ rember: true }}
					wrapperCol={{ span: 16 }}
					form={form}
				>
					<Form.Item label="用户名" name="username">
						<Input placeholder="请输入用户名" />
					</Form.Item>
					<Form.Item label="密码" name="password">
						<Input.Password placeholder="请输入密码" />
					</Form.Item>
					<Form.Item name="rember" valuePropName="checkd" wrapperCol={{ offset: 6, span: 16 }}>
						<Checkbox>记住我</Checkbox>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 9, span: 16 }}>
						<Button type="primary" htmlType="submit">
							登录
						</Button>
					</Form.Item>
				</Form>
				<Link to="/register">前往注册</Link>
			</div>
		</div>
	);
};

export default memo(Login);
