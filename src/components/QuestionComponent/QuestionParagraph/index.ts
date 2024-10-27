export * from './interface';
import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionComponentParagraphPropsDefault } from './interface';
export default {
	title: '段落',
	type: 'questionParagraph',
	Component,
	PropComponent,
	defaultProps: QuestionComponentParagraphPropsDefault
};
