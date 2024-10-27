import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import style from './register.module.scss';
import { Form, Input, Space, Typography, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { userRegister } from '../services/user';
const { Title } = Typography;
export interface IProps {
	children?: ReactElement;
}
const Register: FC<IProps> = function (props) {
	// fotmik表单验证工具
	const {
		data,
		loading,
		run: registerrun
	} = useRequest(
		async (username: string, nickname: string, password: string) => {
			const res = await userRegister(username, password, nickname);
			return res;
		},
		{
			manual: true,
			onSuccess(result) {
				message.success('注册成功');
			}
		}
	);
	function onfinish(values: any) {
		const { username, password, nickname } = values;
		registerrun(username, password, nickname);
	}
	return (
		<div className={style.container}>
			<div className={style.info}>
				<div>
					<Space>
						<Title level={3}>
							<UserAddOutlined />
						</Title>
						<Title level={3}>注册</Title>
					</Space>{' '}
				</div>
				<Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onfinish}>
					<Form.Item
						label="用户名： "
						name="username"
						rules={[
							{ required: true, message: '请输入用户名' },
							{ pattern: /^\w+$/, message: '请勿输入特殊字符' }
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item label="密码 " name="password" rules={[{ required: true, message: '请输入密码' }]}>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label="确认密码 "
						name="confrim"
						dependencies={['password']}
						rules={[
							{ required: true, message: '请输入确认密码' },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('两次密码不一致'));
								}
							})
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label="昵称"
						name="nickname"
						rules={[{ type: 'string', min: 5, max: 20, message: '昵称长度位5~20位' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 10, span: 16 }}>
						<Button type="primary" htmlType="submit" disabled={loading}>
							注册
						</Button>
					</Form.Item>
				</Form>
				<Link to="/login" style={{ textAlign: 'center' }}>
					已有账号,立即登录
				</Link>
			</div>
		</div>
	);
};

export default memo(Register);
Register.displayName = 'Register';
