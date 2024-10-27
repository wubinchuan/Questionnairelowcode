import { useEffect } from 'react';
import useGetuserinfo from './useGetuserinfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { isNeeduser, MANAGE_INDEX_PATH } from '../router';

function useNeeduserinfo(isload: boolean) {
	const { username } = useGetuserinfo();
	const nav = useNavigate();
	const { pathname } = useLocation();
	useEffect(() => {
		// const isNedd = isNeeduser(pathname);
		// if (username) {
		// 	//已登录，登录注册页跳转首页
		// 	if (isNedd) {
		// 		//跳转首页
		// 		nav(MANAGE_INDEX_PATH);
		// 	}
		// 	return;
		// }
		// //未登录，如果不是登录页，跳转登录页
		// if (!isNedd) {
		// 	nav('/login');
		// }
	}, [username, pathname]);
}
export default useNeeduserinfo;
