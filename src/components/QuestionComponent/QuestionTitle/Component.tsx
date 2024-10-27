import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import { Typography } from 'antd';
import React from 'react';
const { Title } = Typography;
import type { QuestionTieletype, QuestionTieletyprDefault } from './interface';
const QustionTitle: FC<QuestionTieletype> = function (props) {
	const { title = '一行标题', level = 1, isCenter = false } = props;
	const genfontsize = (level: number) => {
		if (level == 1) {
			return '24px';
		}
		if (level == 2) {
			return '20px';
		}
		if (level == 3) {
			return '16px';
		}
		return '16px';
	};
	return (
		<div>
			<Title
				level={level}
				style={{ textAlign: isCenter ? 'center' : 'start', margin: '0', fontSize: genfontsize(level) }}
			>
				{title}
			</Title>
		</div>
	);
};

export default QustionTitle;
