export type QuestionInfoProps = {
	title?: string;
	desc?: string;
	onChange?: (value: QuestionInfoProps) => void;
	disabled?: boolean;
};

export const QuestionInfoDefaultProps = {
	title: '标题',
	desc: '一段描述'
};
