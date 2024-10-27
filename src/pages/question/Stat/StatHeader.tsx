import { memo, ReactElement, useRef } from 'react';
import type { FC } from 'react';
import React from 'react';
import style from './statHeader.module.scss';
import { Button, Input, InputRef, message, Popover, Tooltip, Typography } from 'antd';
import { Space } from 'antd';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import { useGetInfo } from '../../../hooks/useGetPageData';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
const { Title } = Typography;
export interface IProps {
	children?: ReactElement;
}
const StatHeader: FC<IProps> = function (props) {
	const { id } = useParams();
	console.log(id);

	const nav = useNavigate();
	const { title, isPublished } = useGetInfo();
	const linkref = useRef<InputRef>(null);
	const url = `http://localhost:3000/quest/${id}`;
	const QrcodeEl = (
		<div>
			<QRCode value={url} size={150}></QRCode>
		</div>
	);
	function copyLink() {
		const res = linkref.current;
		if (res == null) return;
		res.select();
		document.execCommand('copy');
		message.success('拷贝成功');
	}
	function getlinkOrQrtoken() {
		if (!isPublished) return null;

		return (
			<Space>
				<Input value={url} ref={linkref} />
				<Tooltip title="拷贝连接">
					<Button icon={<CopyOutlined />} onClick={copyLink}></Button>
				</Tooltip>
				<Popover content={QrcodeEl}>
					<Button icon={<QrcodeOutlined />}></Button>
				</Popover>
			</Space>
		);
	}
	return (
		<div className={style['header-warpper']}>
			<div className={style.header}>
				<div className={style.left}>
					<Space>
						<Button type="link" onClick={() => nav(-1)} icon={<LeftOutlined />}></Button>
						<Title>{title}</Title>
					</Space>
				</div>
				<div className={style.main}>{getlinkOrQrtoken()}</div>
				<div className={style.right}>
					<Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
						编辑页面
					</Button>
				</div>
			</div>
		</div>
	);
};

export default memo(StatHeader);
StatHeader.displayName = 'StatHeader';
