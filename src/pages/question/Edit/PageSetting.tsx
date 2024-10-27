import { memo, ReactElement, useEffect } from 'react';
import type { FC } from 'react';
import React from 'react';
import { useGetInfo } from '../../../hooks/useGetPageData';
import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch } from 'react-redux';
import { resetPageinfo } from '../../../store/Pageinfo';
export interface IProps {
	children?: ReactElement;
}
const PageSetting: FC<IProps> = function (props) {
	const pageinfo = useGetInfo();
	const dispatch = useDispatch();
	const { title, desc, css, js } = pageinfo;
	const [form] = Form.useForm();
	useEffect(() => {
		form.setFieldsValue(pageinfo);
	}, [pageinfo]);
	function handleFormchange() {
		dispatch(resetPageinfo(form.getFieldsValue()));
	}
	return (
		<Form layout="vertical" initialValues={pageinfo} form={form} onValuesChange={handleFormchange}>
			<Form.Item label="页面标题" name="title">
				<Input value={title} />
			</Form.Item>
			<Form.Item label="问卷描述" name="desc">
				<TextArea></TextArea>
			</Form.Item>
			<Form.Item label="Css" name="css">
				<TextArea></TextArea>
			</Form.Item>
			<Form.Item label="JS" name="js">
				<TextArea></TextArea>
			</Form.Item>
		</Form>
	);
};

export default memo(PageSetting);
PageSetting.displayName = 'PageSetting';
