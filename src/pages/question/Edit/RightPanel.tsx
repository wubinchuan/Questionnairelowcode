import { Children, memo, ReactElement, useEffect, useState } from 'react';
import type { FC } from 'react';
import React from 'react';
import { Tabs } from 'antd';
import { FileTextOutlined, SettingFilled } from '@ant-design/icons';
import ComponentProp from './ComponentProp';
import useGetCanvasData from '../../../hooks/useGetCanvasDate';
import PageSetting from './PageSetting';

export interface IProps {
	children?: ReactElement;
}
enum Tab_Name {
	PROP_KEY = 'prop',
	SETTING_KEY = 'setting'
}
const RightPanel: FC<IProps> = function (props) {
	const { selectedId } = useGetCanvasData();
	const [checkOutTab, setcheckOutTab] = useState(Tab_Name.PROP_KEY);

	function tabclick(e: any) {
		setcheckOutTab(e);
	}
	useEffect(() => {
		const item = selectedId;

		if (!item) {
			setcheckOutTab(Tab_Name.SETTING_KEY);
		} else {
			setcheckOutTab(Tab_Name.PROP_KEY);
		}
	}, [selectedId]);
	const tabsItems = [
		{
			key: 'prop',
			label: (
				<span>
					<FileTextOutlined />
					属性
				</span>
			),
			children: <ComponentProp />
		},
		{
			key: 'setting',
			label: (
				<span>
					<SettingFilled />
					页面设置
				</span>
			),
			children: <PageSetting />
		}
	];
	return <Tabs defaultActiveKey="prop" activeKey={checkOutTab} items={tabsItems} onTabClick={tabclick}></Tabs>;
};

export default memo(RightPanel);
RightPanel.displayName = 'RightPanel';
