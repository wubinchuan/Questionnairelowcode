//输出所有的属性
import { FC } from 'react';
import QustionInputConf, { QustionInput } from './QuestionInput';

import QuestionTitleConf, { QuestionTieletype } from './QuestionTitle';
import type { QuestionComponentParagraphProps } from './QuestionParagraph';
import QuestionParagraphConf from './QuestionParagraph/index';
import { QuestionInfoProps } from './QuestionInfo';
import QuestionInfoConf from './QuestionInfo/index';
import QuestionTextAreaConf, { QuestionTextArea } from './QuestionTextArea';
import QuestionRadioConf, { QuestionRadioPropType, QuestionRadioStateType } from './QuestionRadio';
import QuestionCheckConf, { QuestionCheckBoxStateType, QuestionCheckPropsType } from './QuestionCheckbox';
//统一导出组件的props类型
export type ComponentPropsType =
	| QuestionTieletype
	| QustionInput
	| QuestionTextArea
	| QuestionComponentParagraphProps
	| QuestionInfoProps
	| QuestionRadioPropType
	| QuestionCheckPropsType;

export type ComponentStatType = QuestionRadioStateType | QuestionCheckBoxStateType;
//统一导出组件的配置
export type ComponentConfType = {
	title: string;
	type: string;
	Component: FC<ComponentPropsType>;
	PropComponent: FC<ComponentPropsType>;
	StatComponent?: FC<ComponentStatType>;
	defaultProps: ComponentPropsType;
};
export type ComponentGroupType = {
	groupid: number;
	groupname: string;
	componentList: ComponentConfType[];
};
//全部组件的配置列表
const componentConfList: ComponentConfType[] = [
	QuestionTitleConf,
	QustionInputConf,
	QuestionParagraphConf,
	QuestionInfoConf,
	QuestionTextAreaConf,
	QuestionRadioConf,
	QuestionCheckConf
];
export const componentGroup = [
	{
		groupid: 33,
		groupname: '文本显示',
		componentList: [QuestionTitleConf]
	},
	{
		groupid: 34,
		groupname: '输入框',
		componentList: [
			QustionInputConf,
			QuestionParagraphConf,
			QuestionInfoConf,
			QuestionTextAreaConf,
			QuestionRadioConf,
			QuestionCheckConf
		]
	}
];
export function getComponentByType(type: string): ComponentConfType | undefined {
	const componentConf = componentConfList.find((item) => item.type === type);
	return componentConf;
}
