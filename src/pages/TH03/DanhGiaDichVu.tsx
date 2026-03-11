import ProTable from '@ant-design/pro-table';
import { Rate, Input, message, Button, Tag } from 'antd';
import { ModalForm, ProFormRate, ProFormTextArea } from '@ant-design/pro-form';

const DanhGiaDichVu = ({ lichHen, setLichHen }: any) => {
	const dsHoanThanh = lichHen.filter((l: any) => l.trangThai === 'Hoàn thành');

	const columns: any[] = [
		{
			title: 'Khách hàng',
			dataIndex: 'khachHang',
			width: 120,
		},

		{
			title: 'Nhân viên',
			dataIndex: 'nhanVien',
			width: 120,
		},

		{
			title: 'Dịch vụ',
			dataIndex: 'dichVu',
			width: 120,
		},

		{
			title: 'Ngày',
			dataIndex: 'ngay',
			width: 120,
			render: (v: any) => <Tag color='blue'>{v}</Tag>,
		},


		{
			title: 'Đánh giá & Bình luận',

			render: (_: any, record: any) =>
				record.danhGia ? (
					<div
						style={{
							padding: 8,
							background: '#fafafa',
							borderRadius: 6,
						}}
					>
						<Rate disabled allowHalf defaultValue={record.danhGia.soSao} style={{ fontSize: 14 }} />

						<div>
							<i>{record.danhGia.binhLuan}</i>
						</div>

						{record.danhGia.phanHoi && (
							<div
								style={{
									color: '#1890ff',
									marginTop: 5,
								}}
							>
								<b>NV phản hồi:</b> {record.danhGia.phanHoi}
							</div>
						)}
					</div>
				) : (
					<ModalForm
						title='Đánh giá dịch vụ'
						trigger={
							<Button type='dashed' size='small'>
								Gửi đánh giá
							</Button>
						}
						onFinish={async (v) => {
							const updated = lichHen.map((l: any) =>
								l.id === record.id
									? {
											...l,
											danhGia: v,
									  }
									: l,
							);

							setLichHen(updated);

							message.success('Đã gửi đánh giá');

							return true;
						}}
					>
						<ProFormRate
							name='soSao'
							label='Số sao'
							rules={[
								{
									required: true,
								},
							]}
						/>

						<ProFormTextArea
							name='binhLuan'
							label='Bình luận'
							rules={[
								{
									required: true,
								},
							]}
						/>
					</ModalForm>
				),
		},


		{
			title: 'Phản hồi nhân viên',

			render: (_: any, record: any) =>
				record.danhGia &&
				!record.danhGia.phanHoi && (
					<Input.Search
						placeholder='Trả lời khách...'
						enterButton='Gửi'
						onSearch={(val) => {
							const updated = lichHen.map((l: any) =>
								l.id === record.id
									? {
											...l,
											danhGia: {
												...l.danhGia,
												phanHoi: val,
											},
									  }
									: l,
							);

							setLichHen(updated);

							message.success('Đã phản hồi');
						}}
					/>
				),
		},
	];

	return (
		<ProTable headerTitle='Đánh giá dịch vụ' dataSource={dsHoanThanh} columns={columns} rowKey='id' search={false} />
	);
};

export default DanhGiaDichVu;
