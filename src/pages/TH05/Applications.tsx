import React, { useState } from 'react';
import { Table, Button, Space, Modal, Input, Tag, Typography, Card, Tooltip, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, HistoryOutlined, TeamOutlined } from '@ant-design/icons';
import moment from 'moment';
import { MemberRecord, Status, Log, RegistrationProps } from './utils';

const { Text, Title } = Typography;
const { TextArea } = Input;

const RegistrationManager = ({ clubs = [], data = [], onSync }: RegistrationProps) => {
	const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
	const [rejectModal, setRejectModal] = useState(false);
	const [reason, setReason] = useState('');
	const [viewLog, setViewLog] = useState<Log[] | null>(null);

	const handleUpdate = (ids: React.Key[], nextStatus: Status, note?: string) => {
		const newLog: Log = {
			admin: 'Admin',
			action: nextStatus,
			date: moment().format('HH:mm DD/MM'),
			note: note || (nextStatus === 'Approved' ? 'Đã duyệt' : ''),
		};

		const updatedData = data.map((item) => {
			if (ids.includes(item.id)) {
				return { ...item, status: nextStatus, history: [newLog, ...item.history] };
			}
			return item;
		});

		onSync(updatedData);
		setSelectedIds([]);
		message.success('Thành công');
	};

	const columns: ColumnsType<MemberRecord> = [
		{
			title: 'Ứng viên',
			render: (_, r) => (
				<Space direction='vertical' size={0}>
					<Text strong>{r.name}</Text>
					<Text type='secondary' style={{ fontSize: 12 }}>
						{r.email}
					</Text>
				</Space>
			),
		},
		{
			title: 'Câu lạc bộ',
			dataIndex: 'clubName',
			filters: clubs.map((c) => ({ text: c.name, value: c.name })),
			onFilter: (v, r) => r.clubName === v,
			render: (v) => (
				<Tag icon={<TeamOutlined />} color='blue'>
					{v}
				</Tag>
			),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			align: 'center',
			render: (s: Status) => {
				const map = { Pending: 'orange', Approved: 'green', Rejected: 'red' };
				const text = { Pending: 'Chờ', Approved: 'Duyệt', Rejected: 'Từ chối' };
				return <Tag color={map[s]}>{text[s].toUpperCase()}</Tag>;
			},
		},
		{
			title: 'Lịch sử',
			align: 'center',
			render: (_, r) => <Button type='text' icon={<HistoryOutlined />} onClick={() => setViewLog(r.history)} />,
		},
	];

	return (
		<Card bordered={false} style={{ borderRadius: 12 }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
				<Title level={4} style={{ margin: 0 }}>
					Quản lý đơn
				</Title>
				<Space>
					<Button
						type='primary'
						icon={<CheckCircleOutlined />}
						disabled={!selectedIds.length}
						onClick={() => handleUpdate(selectedIds, 'Approved')}
					>
						Duyệt ({selectedIds.length})
					</Button>
					<Button
						danger
						icon={<CloseCircleOutlined />}
						disabled={!selectedIds.length}
						onClick={() => setRejectModal(true)}
					>
						Từ chối
					</Button>
				</Space>
			</div>

			<Table
				rowSelection={{ selectedRowKeys: selectedIds, onChange: setSelectedIds }}
				columns={columns}
				dataSource={data}
				rowKey='id'
				pagination={{ pageSize: 8 }}
			/>

			<Modal
				title='Lý do từ chối'
				visible={rejectModal}
				onCancel={() => setRejectModal(false)}
				onOk={() => {
					if (!reason) return message.warning('Nhập lý do');
					handleUpdate(selectedIds, 'Rejected', reason);
					setRejectModal(false);
					setReason('');
				}}
			>
				<TextArea rows={4} placeholder='Lý do...' value={reason} onChange={(e) => setReason(e.target.value)} />
			</Modal>

			<Modal title='Lịch sử' visible={!!viewLog} onCancel={() => setViewLog(null)} footer={null}>
				{viewLog?.map((l, i) => (
					<div key={i} style={{ padding: 10, background: '#fafafa', marginBottom: 8, borderRadius: 8 }}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Text strong>{l.admin}</Text>
							<Text type='secondary' style={{ fontSize: 11 }}>
								{l.date}
							</Text>
						</div>
						<Tag color={l.action === 'Approved' ? 'green' : 'red'} style={{ margin: '4px 0' }}>
							{l.action}
						</Tag>
						{l.note && <div style={{ fontSize: 13 }}>{l.note}</div>}
					</div>
				))}
			</Modal>
		</Card>
	);
};

export default RegistrationManager;
