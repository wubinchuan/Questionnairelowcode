import { memo, ReactElement, useEffect } from 'react';
import type { FC } from 'react';
import React from 'react';
import { Checkbox, Form, Input, message, Select } from 'antd';
import type { QuestionTieletype } from './interface';
const PropComponent: FC<QuestionTieletype> = function (props) {
	const { title, level, isCenter, onChange, disabled } = props;
	const [form] = Form.useForm();
	useEffect(() => {
		//统一类型的组件需要共用一个配置表单，我们只需要更新到对应的每个元素即可
		form.setFieldsValue({ title, level, isCenter });
		console.log(title, 'title');
	}, [title, level, isCenter]);
	function handleChange() {
		if (onChange) {
			onChange(form.getFieldsValue());
		}
	}
	return (
		<Form
			layout="vertical"
			initialValues={{ title, level, isCenter }}
			form={form}
			onValuesChange={handleChange}
			disabled={disabled}
		>
			<Form.Item label="标题内容" name="title" rules={[{ required: true, message: '请输入标题' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="层级" name="level">
				<Select
					options={[
						{ value: 1, text: 1 },
						{ value: 2, text: 2 },
						{ value: 3, text: 3 }
					]}
				></Select>
			</Form.Item>
			<Form.Item label="是否居中" name="isCenter" valuePropName="checked">
				<Checkbox></Checkbox>
			</Form.Item>
		</Form>
	);
};

export default memo(PropComponent);
PropComponent.displayName = 'PropComponent';
