import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionService } from '../services/question';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';
import { resetComponents } from '../store/componentsReducer/index';
import { resetPageinfo } from '../store/Pageinfo';

export function useQuestionData() {
	//获取问卷列表，id变化的时候我们需要拿到新的问卷的信息，将对应的数据存放进store，页面从store获取数据
	const dispatch = useDispatch();
	const { id = '' } = useParams();

	const { loading, data, run, error } = useRequest(
		async (id) => {
			const res = await getQuestionService(id);
			return res as any;
		},
		{ manual: true }
	);
	useEffect(() => {
		if (!data) return;
		const { componentList = [], title = '', desc = '', css = '', js = '', isPublished } = data;
		let selectedId = '';
		if (componentList.length != 0) {
			selectedId = componentList[0].fe_id;
		}
		//存放级store
		if (componentList.length !== 0) {
			dispatch(resetComponents({ componentList, selectedId }));
			dispatch(resetPageinfo({ title, desc, css, js, isPublished }));
		}
	}, [data]);

	useEffect(() => {
		run(id);
	}, [id]);

	return { loading, error };
}
