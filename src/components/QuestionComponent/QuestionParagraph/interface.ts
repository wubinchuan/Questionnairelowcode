export type QuestionComponentParagraphProps = {
	text?: string;
	title?: string;
	isCenter?: boolean;
	onChange?: (value: QuestionComponentParagraphProps) => void;
	disabled?: boolean;
};

export const QuestionComponentParagraphPropsDefault: QuestionComponentParagraphProps = {
	text: '一行文本',
	isCenter: false
};
