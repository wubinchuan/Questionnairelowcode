import { memo, ReactElement, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import React from 'react';
export interface IProps {
	children?: ReactElement;
}
const Formtest: FC<IProps> = function (props) {
	const [inputtext, setinputtext] = useState('');
	function handlechange(event: ChangeEvent<HTMLTextAreaElement>) {
		console.log(event.target.value);
		setinputtext(event.target.value);
	}
	// function gethtml() {
	// 	return { __html: inputtext.replaceAll('\n', '<br/>') };
	// }
	const [gender, setgender] = useState('male');
	function radiochange(evnet: ChangeEvent<HTMLInputElement>) {
		setgender(evnet.target.value);
	}
	const [ck, setck] = useState(false);
	function ckhandle() {
		setck(!ck);
	}
	const [citys, setcitys] = useState<string[]>([]);
	function updatecitys(event: ChangeEvent<HTMLInputElement>) {
		const city = event.target.value;
		if (citys.includes(city)) {
			setcitys(citys.filter((item) => item != city));
		} else {
			setcitys([...citys, city]);
		}
	}
	const [res, setres] = useState<string>('js');
	function handlecli(event: ChangeEvent<HTMLSelectElement>) {
		setres(event.target.value);
	}
	function handelsubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		//阻止默认行为自己提交
	}

	return (
		<>
			<form action="/api/post" onSubmit={handelsubmit}></form>
			{/* <input type="text" value={inputtext} onChange={handlechange} /> */}
			<textarea value={inputtext} onChange={handlechange}></textarea>
			<p dangerouslySetInnerHTML={{ __html: inputtext.replaceAll('\n', '<br/>') }}></p>
			<label htmlFor="radio1">男</label>
			<input type="radio" id="radio1" name="sex" value="male" checked={gender == 'male'} onChange={radiochange} />
			<label htmlFor="radio2">女</label>
			<input type="radio" id="radio2" name="sex" value="man" checked={gender == 'man'} onChange={radiochange} />
			{/* 
			<label htmlFor="ck1">女</label>
			<input type="checkbox" id="ck1" name="sex" value="上海" checked={ck} onChange={ckhandle} /> */}

			<label htmlFor="ck3">女</label>
			<input
				type="checkbox"
				id="ck3"
				name="sex"
				value="上海"
				checked={citys.includes('上海')}
				onChange={updatecitys}
			/>
			<label htmlFor="ck4">女</label>
			<input
				type="checkbox"
				id="ck4"
				name="sex"
				value="背景"
				checked={citys.includes('背景')}
				onChange={updatecitys}
			/>
			<label htmlFor="ck5">女</label>
			<input
				type="checkbox"
				id="ck5"
				name="sex"
				value="网口就"
				onChange={updatecitys}
				checked={citys.includes('网口就')}
			/>
			{/* 这样选择的数组如果想要form表单提交使用隐藏域 */}
			<input type="hidden" name="citys" value={JSON.stringify(citys)} />
			{JSON.stringify(citys)}

			<select value={res} onChange={handlecli}>
				<option value="java">java</option>
				<option value="python">python</option>
				<option value="xx">xx</option>
				<option value="js">js</option>
			</select>
		</>
	);
};

export default memo(Formtest);
