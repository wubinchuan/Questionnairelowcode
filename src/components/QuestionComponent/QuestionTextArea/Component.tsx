import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import type { QuestionTextArea } from './interface';
import { Typography, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
const { Paragraph } = Typography;
const QuestionInput: FC<QuestionTextArea> = function (props) {
	const { title = '输入框标题', placeholder = '请输入提示' } = props;
	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<div>
				<TextArea placeholder={placeholder}></TextArea>
			</div>
		</div>
	);
};

export default QuestionInput;
