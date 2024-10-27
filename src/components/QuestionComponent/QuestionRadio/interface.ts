type OptionType = {
	value: string;
	text: string;
};
export type QuestionRadioPropType = {
	title?: string;
	isVertical?: boolean;
	options?: OptionType[];
	value?: string; //defaultvalue
	disabled?: boolean;
	onChange?: (value: QuestionRadioPropType) => void;
};

export const QuestionRadioPropTypeDefault = {
	title: '单选框',
	isVertical: false,
	options: [
		{ value: '1', text: '选项一' },
		{ value: '2', text: '选项二' }
	],
	value: ''
};
export type QuestionRadioStateType = {
	stat: Array<{ name: string; count: number }>;
};
