import { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm, Tag, Rate } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormText,
  ProFormDigit,
} from '@ant-design/pro-form';

import { tinhDiemTrungBinh } from './utils';

const QuanLyNhanVien = ({ nhanVien, setNhanVien, lichHen }: any) => {

  const [editing, setEditing] = useState<any>(null);

  // đếm số khách hôm nay
  const demKhachHomNay = (id: string) => {
    const today = new Date().toLocaleDateString();

    return lichHen.filter(
      (l: any) =>
        l.nhanVienId === id &&
        new Date(l.ngay).toLocaleDateString() === today
    ).length;
  };

  const columns: any[] = [
    { title: 'Họ tên', dataIndex: 'hoTen' },

    {
      title: 'Lịch làm việc',
      dataIndex: 'lichLamViec',
      render: (t: string) => <Tag color="blue">{t}</Tag>,
    },

    {
      title: 'Khách hôm nay',
      render: (_: any, record: any) => {
        const daNhan = demKhachHomNay(record.id);

        return (
          <Tag color={daNhan >= record.gioiHanKhach ? 'red' : 'green'}>
            {daNhan} / {record.gioiHanKhach}
          </Tag>
        );
      },
    },

    {
      title: 'Đánh giá TB',
      render: (_: any, record: any) => {
        const score = tinhDiemTrungBinh(
          record.id,
          lichHen
        );

        return (
          <>
            <Rate
              disabled
              defaultValue={score}
              allowHalf
              style={{ fontSize: 14 }}
            />
            ({score})
          </>
        );
      },
    },

    {
      title: 'Thao tác',
      render: (_: any, record: any) => (
        <>
          <a
            onClick={() => setEditing(record)}
            style={{ marginRight: 10 }}
          >
            Sửa
          </a>

          <Popconfirm
            title="Xóa nhân viên?"
            onConfirm={() => {
              setNhanVien(
                nhanVien.filter(
                  (i: any) => i.id !== record.id
                )
              );
              message.success('Đã xóa');
            }}
          >
            <a style={{ color: 'red' }}>Xóa</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable
        headerTitle="Danh sách nhân viên"
        dataSource={nhanVien}
        rowKey="id"
        columns={columns}
        search={false}
        toolBarRender={() => [
          <ModalForm
            title="Thêm nhân viên"
            trigger={
              <Button
                type="primary"
                icon={<PlusOutlined />}
              >
                Thêm NV
              </Button>
            }
            onFinish={async (values: any) => {
              setNhanVien([
                ...nhanVien,
                {
                  ...values,
                  id: Date.now().toString(),
                },
              ]);

              message.success('Đã thêm');
              return true;
            }}
          >
            <ProFormText
              name="hoTen"
              label="Họ tên"
              rules={[{ required: true }]}
            />

            <ProFormText
              name="lichLamViec"
              label="Lịch làm việc"
              rules={[{ required: true }]}
            />

            <ProFormDigit
              name="gioiHanKhach"
              label="Giới hạn khách/ngày"
              rules={[{ required: true }]}
            />
          </ModalForm>,
        ]}
      />

      {/* Modal sửa */}

      <ModalForm
        title="Sửa nhân viên"
        open={!!editing}
        initialValues={editing}
        onOpenChange={(v) => !v && setEditing(null)}
        onFinish={async (values: any) => {
          const newList = nhanVien.map(
            (i: any) =>
              i.id === editing.id
                ? { ...i, ...values }
                : i
          );

          setNhanVien(newList);

          message.success('Đã sửa');

          setEditing(null);

          return true;
        }}
      >
        <ProFormText
          name="hoTen"
          label="Họ tên"
          rules={[{ required: true }]}
        />

        <ProFormText
          name="lichLamViec"
          label="Lịch làm việc"
          rules={[{ required: true }]}
        />

        <ProFormDigit
          name="gioiHanKhach"
          label="Giới hạn khách/ngày"
          rules={[{ required: true }]}
        />
      </ModalForm>
    </>
  );
};

export default QuanLyNhanVien;