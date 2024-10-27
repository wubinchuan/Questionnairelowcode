import { Form, Input } from 'antd';
import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import { QuestionInfoProps } from './interface';
import TextArea from 'antd/es/input/TextArea';

const PropComponent: FC<QuestionInfoProps> = function (props) {
	const { title, desc, onChange, disabled } = props;
	const [form] = Form.useForm();
	function changeHandle() {
		if (onChange) {
			onChange(form.getFieldsValue());
		}
	}
	return (
		<Form
			layout="vertical"
			disabled={disabled}
			onValuesChange={changeHandle}
			form={form}
			initialValues={{ title, desc }}
		>
			<Form.Item name="title" label="标题">
				<Input />
			</Form.Item>
			<Form.Item name="desc" label="描述">
				<TextArea />
			</Form.Item>
		</Form>
	);
};

export default memo(PropComponent);
PropComponent.displayName = 'PropComponent';
