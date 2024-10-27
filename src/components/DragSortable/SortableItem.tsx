import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import React from 'react';
export interface IProps {
	children?: JSX.Element;
	id: string;
}
const Sortableitem: FC<IProps> = function ({ id, children }) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};
	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{children}
		</div>
	);
};

export default memo(Sortableitem);
Sortableitem.displayName = 'Sortableitem';
