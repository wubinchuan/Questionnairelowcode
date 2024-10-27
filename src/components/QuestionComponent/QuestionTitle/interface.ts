export type QuestionTieletype = {
	title?: string;
	level?: 1 | 2 | 3 | 4 | 5;
	isCenter?: boolean;
	onChange?: (value: QuestionTieletype) => void;
	disabled?: boolean;
};

export const QuestionTieletyprDefault: QuestionTieletype = {
	title: '一行标题',
	level: 1,
	isCenter: false
};
