import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
import { QuestionCheckBoxStateType } from './interface';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Tooltip } from 'antd';
export interface IProps {
	children?: ReactElement;
}
const StatComponent: FC<QuestionCheckBoxStateType> = function ({ stat }) {
	return (
		<div style={{ width: '400px', height: '300px' }}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={400}
					height={300}
					data={stat}
					margin={{
						top: 5,
						right: 30,
						left: 0,
						bottom: 5
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					{/* <Legend /> */}
					<Bar dataKey="count" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default memo(StatComponent);
StatComponent.displayName = 'StatComponent';
