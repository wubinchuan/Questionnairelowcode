import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import { Checkbox, Space, Typography } from 'antd';
import { QuestionCheckPropsType } from './interface';
const { Paragraph } = Typography;

const Component: FC<QuestionCheckPropsType> = function (props) {
	const { isVertical, list = [], title } = props;
	return (
		<>
			<Paragraph>{title}</Paragraph>
			<Space direction={isVertical ? 'vertical' : 'horizontal'}>
				{list.map((item) => {
					return (
						<Checkbox key={item.text} checked={item.checked}>
							{item.text}
						</Checkbox>
					);
				})}
			</Space>
		</>
	);
};

export default memo(Component);
Component.displayName = 'Component';
