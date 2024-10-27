import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import { Checkbox, Form, Input } from 'antd';
import { QuestionComponentParagraphProps } from './interface';
import { useForm } from 'antd/es/form/Form';
const { TextArea } = Input;

const label: FC<QuestionComponentParagraphProps> = function (props) {
	const { text, isCenter, onChange, disabled } = props;
	const [form] = useForm();
	function handleChange(values: any) {
		onChange && onChange(form.getFieldsValue());
	}
	return (
		<Form
			onValuesChange={handleChange}
			disabled={disabled}
			form={form}
			layout="vertical"
			initialValues={{ text, isCenter }}
		>
			<Form.Item
				name="text"
				label="文本内容"
				rules={[{ required: true }]}
				style={{ textAlign: isCenter ? 'center' : 'start' }}
			>
				<TextArea />
			</Form.Item>
			<Form.Item name="isCenter" label="是否居中" valuePropName="checked" layout="horizontal">
				<Checkbox />
			</Form.Item>
		</Form>
	);
};

export default memo(label);
label.displayName = 'label';
