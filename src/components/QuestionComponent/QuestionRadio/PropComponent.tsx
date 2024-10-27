import { Button, Checkbox, Form, Input, Radio, Select, Space } from 'antd';
import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import { QuestionRadioPropType } from './interface';
import { MinusCircleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { updateComponentProps } from '../../../store/componentsReducer';
import cloneDeep from 'lodash.clonedeep';

const propComponent: FC<QuestionRadioPropType> = function (props) {
	const { title, value, options = [], disabled, isVertical, onChange } = props;
	const [form] = Form.useForm<QuestionRadioPropType>();
	const dispath = useDispatch();
	function listenFormUpdate() {
		console.log(form.getFieldsValue());
		const newvalue = cloneDeep(form.getFieldsValue());
		const { options = [] } = newvalue;
		console.log(newvalue);

		options?.forEach((item) => {
			item.value = item.text;
		});
		if (onChange) {
			onChange(newvalue);
		}
	}
	return (
		<Form
			layout="vertical"
			disabled={disabled}
			initialValues={{ title, value, options, isVertical }}
			form={form}
			onValuesChange={listenFormUpdate}
		>
			<Form.Item label="标题" name="title">
				<Input />
			</Form.Item>
			<Form.Item label="选项">
				<Form.List name="options">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name }, index) => (
								<Space key={key} align="baseline">
									<Form.Item
										name={[name, 'text']}
										validateTrigger="onBlur"
										rules={[
											{ required: true, message: 'Please input your username!' },
											{
												validator: (_, text) => {
													const { options = [] } = form.getFieldsValue();
													let count = 0;
													options.forEach((item: any) => {
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
								<Button type="link" onClick={() => add({ text: '', value: '' })}>
									添加选项
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form.Item>
			<Form.Item label="默认选中" name="value">
				<Select options={options.map((item) => ({ label: item.text, value: item.text }))}></Select>
			</Form.Item>
			<Form.Item label="是否垂直" name="isVertical" valuePropName="checked">
				<Checkbox />
			</Form.Item>
		</Form>
	);
};

export default memo(propComponent);
propComponent.displayName = 'propComponent';
