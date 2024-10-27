import Component from './Component';
import { DefaultQuestionInput } from './interface';
export * from './interface';
import PropComponent from './PropComponent';
export default {
	title: '输入框',
	type: 'questionInput',
	Component,
	PropComponent,
	defaultProps: DefaultQuestionInput
};
