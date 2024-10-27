export interface QustionInput {
	title?: string;
	placeholder?: string;
	onChange?: (value: QustionInput) => void;
	disabled?: boolean;
}
export const DefaultQuestionInput: QustionInput = {
	title: '输入框',
	placeholder: '请输入内容'
};
