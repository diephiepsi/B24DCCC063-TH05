import React, { useState, useMemo } from 'react';
import { Card, Row, Col, Statistic, DatePicker, Typography } from 'antd';
import ColumnChart from '@/components/Chart/ColumnChart';
import moment, { type Moment } from 'moment';
import type { LichHen, NhanVien } from './utils';

const { Title } = Typography;
const GIA_DICH_VU = 150000; // giá cơ bản

interface IProps {
	lichHen: LichHen[];
	nhanVien: NhanVien[];
}

const ThongKeBaoCao: React.FC<IProps> = ({ lichHen, nhanVien }) => {
	const [selectedMonth, setSelectedMonth] = useState<Moment>(moment());

	// Lọc lịch hẹn theo tháng 
	const filteredLichHen = useMemo(
		() => lichHen.filter((l) => moment(l.ngayHen).isSame(selectedMonth, 'month')),
		[lichHen, selectedMonth],
	);

	// Tính toán toàn bộ số liệu thống kê trong một vòng lặp 
	const { dailyChart, revenueChart, totalRevenue } = useMemo(() => {
		const daysInMonth = selectedMonth.daysInMonth();
		const dailyCounts = new Array(daysInMonth).fill(0);
		const revenueMap: Record<string, number> = {};
		let revenueSum = 0;

		filteredLichHen.forEach((l) => {
			// 1. Đếm số lịch theo ngày
			const dayIndex = moment(l.ngayHen).date() - 1;
			dailyCounts[dayIndex]++;

			// 2. Tính doanh thu (chỉ tính đơn hoàn thành)
			if (l.trangThai === 'Hoàn thành') {
				revenueMap[l.nhanVienId] = (revenueMap[l.nhanVienId] || 0) + GIA_DICH_VU;
				revenueSum += GIA_DICH_VU;
			}
		});

		return {
			dailyChart: {
				xAxis: Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
				yAxis: [dailyCounts],
				yLabel: ['Số lịch hẹn'],
			},
			revenueChart: {
				xAxis: Object.keys(revenueMap).map((id) => nhanVien.find((n) => n.id === id)?.hoTen || `NV ${id}`),
				yAxis: [Object.values(revenueMap)],
				yLabel: ['Doanh thu (đ)'],
			},
			totalRevenue: revenueSum,
		};
	}, [filteredLichHen, selectedMonth, nhanVien]);

	const monthFormat = selectedMonth.format('MM-YYYY');

	return (
		<div>
			<Row gutter={16} align='middle' style={{ marginBottom: 20 }}>
				<Col>
					<Title level={5} style={{ marginBottom: 0 }}>
						Thống kê theo tháng:
					</Title>
				</Col>
				<Col>
					<DatePicker
						picker='month'
						value={selectedMonth}
						onChange={(date) => setSelectedMonth(date ?? moment())}
						format='MM-YYYY'
						allowClear={false}
					/>
				</Col>
			</Row>

			<Row gutter={16} style={{ marginBottom: 20 }}>
				<Col span={12} md={12}>
					<Card>
						<Statistic title={`Tổng doanh thu (Tháng ${monthFormat})`} value={totalRevenue} suffix='đ' />
					</Card>
				</Col>
				<Col span={12} md={12}>
					<Card>
						<Statistic title={`Tổng lịch hẹn (Tháng ${monthFormat})`} value={filteredLichHen.length} />
					</Card>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={24} lg={12}>
					<Card title='Số lượng lịch hẹn theo ngày' style={{ marginBottom: 16 }}>
						<ColumnChart {...dailyChart} height={300} />
					</Card>
				</Col>
				<Col span={24} lg={12}>
<Card title='Doanh thu theo nhân viên'>
						<ColumnChart {...revenueChart} height={300} />
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default ThongKeBaoCao;