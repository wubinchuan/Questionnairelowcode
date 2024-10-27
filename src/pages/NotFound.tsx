import { memo, ReactElement } from 'react';
import React from 'react';
import type { FC } from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HOME_PATH } from '../router';
export interface IProps {
	children?: ReactElement;
}
const NotFound: FC<IProps> = function (props) {
	const nav = useNavigate();
	return (
		<Result
			status="404"
			title="404"
			subTitle="您访问的页面不存在"
			extra={
				<Button type="primary" onClick={() => nav(HOME_PATH)}>
					回到首页
				</Button>
			}
		/>
	);
};

export default memo(NotFound);
NotFound.displayName = 'NotFound';
