import { useRequest } from 'ahooks';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getQuestionListService } from '../services/question';

type Typeobj = {
	isStar?: boolean;
	isDeleted?: boolean;
};
/**
 * @description 列表页面需要根据location的keyword来动态刷新列表
 */
export function useQuestionlist(opt: Partial<Typeobj>) {
	const [searchparams]: any = useSearchParams();
	const { isDeleted, isStar } = opt as any;
	const { data, loading, error, refresh } = useRequest(
		async () => {
			const keyword = searchparams.get('keyword') || '';
			const page = searchparams.get('page') || 1;
			const pageSize = searchparams.get('pageSize') || 10;
			const res = getQuestionListService({ keyword, isDeleted, isStar, page, pageSize });
			return res;
		},
		{ refreshDeps: [searchparams] } //刷新的依赖项
	);
	return { data, loading, error, refresh };
}
