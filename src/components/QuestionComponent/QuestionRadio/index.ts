export * from './interface';
import Component from './Component';
import { QuestionRadioPropTypeDefault } from './interface';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';
export default {
	title: '单选',
	type: 'QuestionRadio',
	Component,
	PropComponent,
	StatComponent,
	defaultProps: QuestionRadioPropTypeDefault
};
