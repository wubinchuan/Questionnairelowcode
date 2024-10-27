export interface QuestionTextArea {
	title?: string;
	placeholder?: string;
	onChange?: (value: QuestionTextArea) => void;
	disabled?: boolean;
}
export const DefaultQuestionTextArea: QuestionTextArea = {
	title: '多行文本',
	placeholder: '请输入内容'
};
