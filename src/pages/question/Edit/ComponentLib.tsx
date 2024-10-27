import { memo, ReactElement } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import type { FC } from 'react';
import React from 'react';
import { ComponentConfType, componentGroup } from '../../../components/QuestionComponent';
import { getComponentByType } from '../../../components/QuestionComponent';
import { Typography } from 'antd';
import style from './componentlib.module.scss';
import { addComponent, ComponentInfoType } from '../../../store/componentsReducer';
import { useDispatch } from 'react-redux';
const { Title } = Typography;
export interface IProps {
	children?: ReactElement;
}

function findComponetByType(type: string) {
	const dispatch = useDispatch();
	function handleaddComponent(c: ComponentConfType) {
		const { title, type } = c;
		dispatch(
			addComponent({
				fe_id: nanoid(2), //为什么使用fe_id我们遵从后端使用mongdb,这里的id是我们前端生成的，无法与数据库_id格式统一
				title,
				type,
				props: c.defaultProps
			})
		);
	}
	const component = getComponentByType(type);
	const Component = component!.Component;
	return (
		<div key={component?.type} className={style['componentwrapper']} onClick={() => handleaddComponent(component!)}>
			<div className={style.component}>
				<Component {...component?.defaultProps} />
			</div>
		</div>
	);
}
const ComponentLib: FC<IProps> = function (props) {
	return (
		<div>
			{componentGroup.map((item, index) => {
				return (
					<div key={index}>
						<Title level={3} style={{ fontSize: '16px', marginTop: index === 0 ? '0' : '15px' }}>
							{item.groupname}
						</Title>
						{item.componentList.map((component) => findComponetByType(component.type))}
					</div>
				);
			})}
		</div>
	);
};

export default memo(ComponentLib);
