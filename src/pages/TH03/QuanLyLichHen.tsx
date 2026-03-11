import React, { useState, useMemo } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, message, Select, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormSelect, ProFormDatePicker, ProFormTimePicker } from '@ant-design/pro-form';

const QuanLyLichHen = ({ lichHen, setLichHen, nhanVien }: any) => {
  const [searchParams, setSearchParams] = useState<any>({});

  const filteredData = useMemo(() => {
    return lichHen.filter((item: any) => {
      const matchName = !searchParams.khachHang || item.khachHang.toLowerCase().includes(searchParams.khachHang.toLowerCase());
      const matchStatus = !searchParams.trangThai || item.trangThai === searchParams.trangThai;
      return matchName && matchStatus;
    });
  }, [lichHen, searchParams]);

  const handleAddBooking = async (values: any) => {
    const isTrung = lichHen.find((l: any) => 
      l.nhanVienId === values.nhanVienId && l.ngayHen === values.ngayHen && l.gioHen === values.gioHen && l.trangThai !== 'Hủy'
    );
    if (isTrung) return message.error('Nhân viên này đã có lịch hẹn vào khung giờ này!');

    const nv = nhanVien.find((n: any) => n.id === values.nhanVienId);
    const count = lichHen.filter((l: any) => l.nhanVienId === values.nhanVienId && l.ngayHen === values.ngayHen).length;
    if (count >= (nv?.gioiHanKhach || 0)) return message.error('Nhân viên đã hết lượt phục vụ trong ngày này!');

    setLichHen([{ ...values, id: Date.now().toString(), trangThai: 'Chờ duyệt' }, ...lichHen]);
    message.success('Đặt lịch thành công!');
    return true;
  };

  const columns: any[] = [
    { title: 'Khách hàng', dataIndex: 'khachHang', search: true },
    { title: 'Ngày hẹn', dataIndex: 'ngayHen', valueType: 'date', search: false },
    { title: 'Giờ', dataIndex: 'gioHen', valueType: 'time', search: false },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      valueType: 'select',
      valueEnum: {
        'Chờ duyệt': { text: 'Chờ duyệt', status: 'Default' },
        'Xác nhận': { text: 'Xác nhận', status: 'Processing' },
        'Hoàn thành': { text: 'Hoàn thành', status: 'Success' },
        'Hủy': { text: 'Hủy', status: 'Error' },
      },
      render: (val: string, record: any) => (
        <Select defaultValue={val} style={{ width: 120 }} onChange={(v) => {
          setLichHen(lichHen.map((l: any) => l.id === record.id ? { ...l, trangThai: v } : l));
        }}>
          {['Chờ duyệt', 'Xác nhận', 'Hoàn thành', 'Hủy'].map(t => <Select.Option key={t} value={t}>{t}</Select.Option>)}
        </Select>
      )
    },
  ];

  return (
    <ProTable
      headerTitle="Quản lý lịch hẹn"
      dataSource={filteredData}
      columns={columns}
      rowKey="id"
      onSubmit={(p) => setSearchParams(p)}
      onReset={() => setSearchParams({})}
      toolBarRender={() => [
        <ModalForm
          title="Tạo lịch hẹn mới"
          trigger={<Button type="primary" icon={<PlusOutlined />}>Đặt lịch ngay</Button>}
          onFinish={handleAddBooking}
        >
          <ProFormText name="khachHang" label="Tên khách hàng" rules={[{ required: true }]} />
          <ProFormSelect 
            name="nhanVienId" 
            label="Chọn nhân viên" 
            options={nhanVien.map((n: any) => ({ label: n.hoTen, value: n.id }))} 
            rules={[{ required: true }]} 
          />
          <ProFormDatePicker name="ngayHen" label="Ngày hẹn" rules={[{ required: true }]} />
          <ProFormTimePicker name="gioHen" label="Giờ hẹn" rules={[{ required: true }]} />
        </ModalForm>
      ]}
    />
  );
};
export default QuanLyLichHen;