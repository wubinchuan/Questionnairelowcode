import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import type { QustionInput } from './interface';
import { Typography, Input } from 'antd';
const { Paragraph } = Typography;
const QuestionInput: FC<QustionInput> = function (props) {
	const { title = '输入框标题', placeholder = '请输入提示' } = props;
	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<div>
				<Input placeholder={placeholder}></Input>
			</div>
		</div>
	);
};

export default QuestionInput;
