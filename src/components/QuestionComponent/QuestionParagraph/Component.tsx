import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import { Typography } from 'antd';
import { QuestionComponentParagraphProps, QuestionComponentParagraphPropsDefault } from './interface';
const { Paragraph } = Typography;

const Component: FC<QuestionComponentParagraphProps> = function (props) {
	const { text, isCenter } = { ...props };
	const t = text?.replaceAll('\n', '<br>');
	const textlist = text?.split('\n');
	return (
		<Paragraph style={{ textAlign: isCenter ? 'center' : 'start' }}>
			{/* <span dangerouslySetInnerHTML={{ __html: t || '' }}></span> */}
			{textlist?.map((item, index) => {
				return (
					<span key={index}>
						{index > 0 && <br />}
						{item}
					</span>
				);
			})}
		</Paragraph>
	);
};

export default memo(Component);
Component.displayName = 'Component';
