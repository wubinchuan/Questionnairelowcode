import { useSelector } from 'react-redux';

import { RootState } from '../store/index';
import { userinfoType } from '../store/user';
function useGetuserinfo() {
	const { username, nickname } = useSelector<RootState>((state) => ({
		username: state.user.username,
		nickname: state.user.nickname
	})) as userinfoType;
	return { username, nickname };
}
export default useGetuserinfo;
