import { useRequest } from 'ahooks';
import { memo, ReactElement, useEffect, useState } from 'react';
import type { FC } from 'react';
import React from 'react';
import { getStatcount } from '../../../services/stat';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
import { getComponentByType } from '../../../components/QuestionComponent';

const { Title } = Typography;
export interface IProps {
	children?: ReactElement;
	selectedComponentId: string;
	selectedComponentType: string;
}
const ChatStat: FC<IProps> = function (props) {
	const { id = '' } = useParams();
	const { selectedComponentId, selectedComponentType } = props;
	const [countdata, setdatacount] = useState<any>([]);
	const { run, loading } = useRequest(
		async () => {
			const res = await getStatcount(id, selectedComponentId);
			return res;
		},
		{
			manual: true,
			onSuccess(result: any) {
				setdatacount(result.stat);
			}
		}
	);
	useEffect(() => {
		if (selectedComponentId) {
			run();
		}
	}, [id, selectedComponentId]);
	function handlepageinfo() {
		if (!selectedComponentId) return <div>请选择组件</div>;
		const componetConf = getComponentByType(selectedComponentType);
		console.log(componetConf);

		if (componetConf && componetConf?.StatComponent) {
			const { StatComponent } = componetConf;

			return (
				<div>
					<StatComponent stat={countdata} />
				</div>
			);
		}
	}
	return (
		<div>
			<div>
				<Title level={3} style={{ marginTop: '0' }}>
					图标统计
				</Title>
			</div>
			{handlepageinfo()}
		</div>
	);
};

export default memo(ChatStat);
ChatStat.displayName = 'ChatStat';
