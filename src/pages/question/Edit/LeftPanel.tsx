import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import { Tabs, TabsProps } from 'antd';
import { DotChartOutlined, RadarChartOutlined } from '@ant-design/icons';
import ComponentLib from './ComponentLib';
import Layers from './Layers';
export interface IProps {
	children?: ReactElement;
}
const items: TabsProps['items'] = [
	{
		key: 'componentlib',
		label: '组件库',
		icon: <RadarChartOutlined />,
		children: <ComponentLib />
	},
	{
		key: 'panel',
		label: '图层',
		icon: <DotChartOutlined />,
		children: <Layers />
	}
];
const LeftPanel: FC<IProps> = function (props) {
	return (
		<div>
			<Tabs defaultActiveKey="componentlib" items={items} />
		</div>
	);
};

export default memo(LeftPanel);
LeftPanel.displayName = 'LeftPanel';
