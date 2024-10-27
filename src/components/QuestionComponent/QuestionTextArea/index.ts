import Component from './Component';
import { DefaultQuestionTextArea } from './interface';
export * from './interface';
import PropComponent from './PropComponent';
export default {
	title: '多行文本',
	type: 'questionTextArea',
	Component,
	PropComponent,
	defaultProps: DefaultQuestionTextArea
};
