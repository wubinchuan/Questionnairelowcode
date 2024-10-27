import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import useGetCanvasData from '../../../hooks/useGetCanvasDate';
import { getComponentByType } from '../../../components/QuestionComponent';
import style from './componentList.module.scss';
import classNames from 'classnames';
export interface IProps {
	children?: ReactElement;
	seletedId: string;
	setSelected: (id: string) => void;
	setSelectedType: (type: string) => void;
}
const ComponentList: FC<IProps> = function (props) {
	const { seletedId, setSelected, setSelectedType } = props;
	const { componentList } = useGetCanvasData();
	function handleclick(id: string, type: string) {
		setSelected(id);
		setSelectedType(type);
	}
	return (
		<div className={style.componentlist}>
			{componentList
				.filter((item) => !item.isHidden)
				.map((iten) => {
					const { type, title, fe_id, props } = iten;
					const componentConf = getComponentByType(type);

					const { Component } = componentConf!;
					const defalutclass = style.componentwarpper;
					const activeclass = style.active;
					const newclass = classNames({
						[defalutclass]: true,
						[activeclass]: fe_id === seletedId
					});

					return (
						<div key={fe_id} className={newclass} onClick={() => handleclick(fe_id, type)}>
							<div className={style.component}>
								<Component {...props}></Component>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default memo(ComponentList);
ComponentList.displayName = 'ComponentList';
