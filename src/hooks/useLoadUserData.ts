import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useGetuserinfo from './useGetuserinfo';
import { fetchuserinfo } from '../store/user';
import { useRequest } from 'ahooks';

function usegetuserinfoData() {
	const [waitingUserData, setWaitinguserDate] = useState(true);
	const dispatch = useDispatch();
	//有无用户信息
	const { username } = useGetuserinfo();
	const { loading, data, error, run } = useRequest(
		async () => {
			await dispatch(fetchuserinfo() as any);
		},
		{ manual: true }
	);
	//异步加载数据redux
	useEffect(() => {
		if (username) {
			setWaitinguserDate(false);
			return;
		} else {
			run();
			setWaitinguserDate(false);
		}
	}, [username]);
	return loading;
}
export default usegetuserinfoData;
