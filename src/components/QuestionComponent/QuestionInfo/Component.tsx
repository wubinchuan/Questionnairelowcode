import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import { Typography } from 'antd';
import { QuestionInfoProps } from './interface';
const { Title, Paragraph } = Typography;
export interface IProps {
	children?: ReactElement;
}
const Component: FC<QuestionInfoProps> = function (props) {
	const { title, desc = '' } = props;
	const t = desc.split('\n');
	return (
		<div style={{ textAlign: 'center' }}>
			<Title level={3} style={{ fontSize: '24px' }}>
				{title}
			</Title>
			<Paragraph>
				{t.map((item, index) => {
					return (
						<span key={index}>
							{index > 0 && <br />}
							{item}
						</span>
					);
				})}
			</Paragraph>
		</div>
	);
};

export default memo(Component);
Component.displayName = 'Component';
