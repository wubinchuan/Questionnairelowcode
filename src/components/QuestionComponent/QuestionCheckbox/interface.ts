export interface OptionType {
	value: string;
	text: string;
	checked: boolean;
}
export type QuestionCheckPropsType = {
	title?: string;
	isVertical?: boolean;
	list?: OptionType[];
	onChange?: (value: QuestionCheckPropsType) => void;
	disabled?: boolean;
};
export const QuestionCheckPropsTypeDefault = {
	title: '多选框',
	isVertical: false,
	list: [{ value: '1', text: '选项1', checked: true }],
	disabled: false
};
export type QuestionCheckBoxStateType = {
	stat: Array<{ name: string; count: number }>;
};
