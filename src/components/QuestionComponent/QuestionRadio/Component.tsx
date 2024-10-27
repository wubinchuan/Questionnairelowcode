import { Checkbox, Form, Input, Radio, Space } from 'antd';
import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import { QuestionRadioPropType } from './interface';
import Title from 'antd/es/typography/Title';

const Component: FC<QuestionRadioPropType> = function (props) {
	const { title, value, options = [], disabled, isVertical } = props;
	return (
		<>
			<Title level={5} style={{ marginTop: '5px' }}>
				{title}
			</Title>
			<Radio.Group value={value}>
				<Space direction={isVertical ? 'vertical' : 'horizontal'}>
					{options.map((item, index) => {
						return (
							<Radio key={index} value={item.value}>
								{item.text}
							</Radio>
						);
					})}
				</Space>
			</Radio.Group>
		</>
	);
};

export default memo(Component);
Component.displayName = 'Component';
