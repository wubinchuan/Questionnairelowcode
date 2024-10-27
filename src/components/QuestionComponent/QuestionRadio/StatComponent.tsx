import { memo, ReactElement, useMemo } from 'react';
import type { FC } from 'react';
import React from 'react';
import type { QuestionRadioStateType } from './interface';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
export interface IProps {
	children?: ReactElement;
}
function format(i: number) {
	return (i * 100).toFixed(2);
}
const StatComponent: FC<QuestionRadioStateType> = function (props) {
	const { stat = [] } = props;
	const counts: number = useMemo(() => {
		let i = 0;
		for (let x = 0; x < stat.length; x++) {
			i += stat[x]?.count;
		}
		return i;
	}, [stat]);
	return (
		<div style={{ width: '300px', height: '400px' }}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						dataKey="count"
						data={stat}
						cx="50%" // x 轴的偏移
						cy="50%" // y 轴的偏移
						outerRadius={50} // 饼图的直径
						fill="#8884d8"
						label={(i) => `${i.name}: ${format(i.count / counts)}%`}
					></Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default memo(StatComponent);
StatComponent.displayName = 'StatComponent';
