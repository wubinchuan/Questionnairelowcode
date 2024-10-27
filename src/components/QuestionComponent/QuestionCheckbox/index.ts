import Component from './Component';
import { QuestionCheckPropsTypeDefault } from './interface';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';
export * from './interface';
export default {
	title: '多选',
	type: 'questionCheckbox',
	Component,
	PropComponent,
	StatComponent,
	defaultProps: QuestionCheckPropsTypeDefault
};
