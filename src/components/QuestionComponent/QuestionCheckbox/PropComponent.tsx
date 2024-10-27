import { Button, Checkbox, Form, Input, Space } from 'antd';
import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import { QuestionCheckPropsType } from './interface';
import { MinusCircleFilled } from '@ant-design/icons';
export interface IProps {
	children?: ReactElement;
}
const PropComponent: FC<QuestionCheckPropsType> = function (props) {
	const { onChange, list, title, isVertical, disabled } = props;
	const [form] = Form.useForm();
	function handleChange() {
		if (onChange) {
			onChange(form.getFieldsValue());
		}
	}
	return (
		<Form
			initialValues={{ list, title, isVertical }}
			onValuesChange={handleChange}
			disabled={disabled}
			form={form}
			layout="vertical"
		>
			<Form.Item label="标题" name="title">
				<Input />
			</Form.Item>
			<Form.Item label="选项">
				<Form.List name="list">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name }, index) => (
								<Space key={key} align="baseline">
									<Form.Item name={[name, 'checked']} valuePropName="checked">
										<Checkbox></Checkbox>
									</Form.Item>
									<Form.Item
										name={[name, 'text']}
										validateTrigger="onBlur"
										rules={[
											{ required: true, message: 'Please input your username!' },
											{
												validator: (_, text) => {
													const { list = [] } = form.getFieldsValue();
													let count = 0;
													list.forEach((item: any) => {
														if (item.text === text) {
															count++;
														}
													});
													if (count === 1) {
														return Promise.resolve();
													}
													return Promise.reject('选项重复');
												}
											}
										]}
									>
										<Input placeholder="请输入选项文字" />
									</Form.Item>
									{index > 1 && (
										<MinusCircleFilled
											onClick={() => remove(name)}
											style={{ marginTop: '-10px' }}
										/>
									)}
								</Space>
							))}
							<Form.Item>
								<Button type="link" onClick={() => add({ text: '', value: '', checked: false })}>
									添加选项
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form.Item>
			<Form.Item name="isVertical" valuePropName="checked">
				<Checkbox checked>竖向排列</Checkbox>
			</Form.Item>
		</Form>
	);
};

export default memo(PropComponent);
PropComponent.displayName = 'PropComponent';
