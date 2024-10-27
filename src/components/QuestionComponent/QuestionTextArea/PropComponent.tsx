import { memo, ReactElement, useEffect } from 'react';
import type { FC } from 'react';
import React from 'react';
import { Form, Input, message } from 'antd';
import type { QuestionTextArea } from './interface';
const PropComponent: FC<QuestionTextArea> = function (props) {
	const { title, placeholder, onChange, disabled } = props;
	const [form] = Form.useForm();
	useEffect(() => {
		//统一类型的组件需要共用一个配置表单，我们只需要更新到对应的每个元素即可
		form.setFieldsValue({ title, placeholder });
	}, [title, placeholder]);
	function handleChange() {
		if (onChange) {
			onChange(form.getFieldsValue());
		}
	}
	return (
		<Form layout="vertical" initialValues={{ title }} form={form} onValuesChange={handleChange} disabled={disabled}>
			<Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="提示内容" name="placeholder">
				<Input placeholder={placeholder} />
			</Form.Item>
		</Form>
	);
};

export default memo(PropComponent);
PropComponent.displayName = 'PropComponent';
