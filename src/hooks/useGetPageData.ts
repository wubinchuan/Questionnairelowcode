import { useSelector } from 'react-redux';
import { StateType } from '../store';

export function useGetInfo() {
	const pageinfo = useSelector((state: StateType) => {
		return state.pageinfo;
	});
	return pageinfo;
}
