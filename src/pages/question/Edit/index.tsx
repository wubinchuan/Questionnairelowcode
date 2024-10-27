import { memo, ReactElement, useEffect, useState } from 'react';
import type { FC } from 'react';
import React from 'react';
import style from './index.module.scss';
import { useQuestionData } from '../../../hooks/useQurstionData';
import EditCanvas from './EditCanvas';
import { useDispatch } from 'react-redux';
import { changeSeletedId } from '../../../store/componentsReducer';
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';
import EditHeader from './EditHeader';
import uselistenKeyPress from '../../../hooks/useBindCanvasKeyPress';
export interface IProps {
	children?: ReactElement;
}
const Edit: FC<IProps> = function (props) {
	const { loading, error } = useQuestionData();
	const dispatch = useDispatch();
	function clearselectedId() {
		dispatch(changeSeletedId(''));
	}
	uselistenKeyPress();
	return (
		<div className={style.contaniner}>
			<div className="header">
				<EditHeader />
			</div>
			<div className={style['content-warpper']}>
				<div className={style.content}>
					<div className={style.left}>
						<LeftPanel />
					</div>
					<div className={style.center} onClick={clearselectedId}>
						<div className={style['cavns-warpper']}>
							<EditCanvas loading={loading} />
						</div>
					</div>
					<div className={style.right}>
						<RightPanel />
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Edit);
Edit.displayName = 'Edit';
