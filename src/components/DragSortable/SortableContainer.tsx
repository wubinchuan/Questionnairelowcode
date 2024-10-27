import { memo, ReactElement } from 'react';
import type { FC } from 'react';
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import {
	// arrayMove,
	SortableContext,
	verticalListSortingStrategy
} from '@dnd-kit/sortable';
import React from 'react';
export interface IProps {
	children?: JSX.Element[] | ReactElement;
	items: Array<{ id: string; [key: string]: any }>;
	onGragEnd: (oldindex: number, newindex: number) => void;
}

const SortableContainer: FC<IProps> = function (props) {
	const { items, children, onGragEnd } = props;
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 8 //设置鼠标移动多少开始移动
			}
		})
	);
	//返回移动开始位置和结束位置
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (over === null) return;
		if (active.id != over.id) {
			const oldindex = items.findIndex((item) => item.fe_id === active.id);
			const newindex = items.findIndex((item) => item.fe_id === over.id);
			onGragEnd(oldindex, newindex);
		}
	}
	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{children}
			</SortableContext>
		</DndContext>
	);
};

export default memo(SortableContainer);
SortableContainer.displayName = 'SortableContainer';
