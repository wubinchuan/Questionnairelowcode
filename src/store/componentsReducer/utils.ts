import { ComponentInfoType } from '.';

export function resetseletedid(fe_id: string, componentList: ComponentInfoType[]) {
	const isvisbList = componentList.filter((item) => !item.isHidden);
	const index = isvisbList.findIndex((item) => item.fe_id === fe_id);
	let seletedid = '';
	if (isvisbList.length === 1) {
		//只有一个元素
		return '';
	} else {
		if (index + 1 === isvisbList.length) {
			seletedid = isvisbList[index - 1].fe_id;
		} else {
			seletedid = isvisbList[index + 1].fe_id;
		}
	}
	return seletedid;
}
