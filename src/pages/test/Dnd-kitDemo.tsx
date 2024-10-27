import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
export interface IProps {
	children?: ReactElement;
}
const Component: FC<IProps> = function (props) {
	return <div></div>;
};

export default memo(Component);
Component.displayName = 'Component';
