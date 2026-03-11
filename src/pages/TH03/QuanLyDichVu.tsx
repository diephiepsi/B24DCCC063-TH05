import { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, message, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormText,
  ProFormDigit,
} from '@ant-design/pro-form';

const QuanLyDichVu = ({ dichVu, setDichVu }: any) => {

  const [editing, setEditing] = useState<any>(null);

  const columns: any[] = [

    {
      title: 'Tên dịch vụ',
      dataIndex: 'ten',
    },

    {
      title: 'Giá (VNĐ)',
      dataIndex: 'gia',
      render: (v: number) =>
        v.toLocaleString() + ' đ',
    },

    {
      title: 'Thời gian',
      dataIndex: 'thoiGian',
      render: (v: number) => (
        <Tag color="blue">{v} phút</Tag>
      ),
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
            title="Xóa dịch vụ?"
            onConfirm={() => {
              setDichVu(
                dichVu.filter(
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
        headerTitle="Danh sách dịch vụ"
        dataSource={dichVu}
        rowKey="id"
        columns={columns}
        search={false}
        toolBarRender={() => [

          <ModalForm
            title="Thêm dịch vụ"
            trigger={
              <Button
                type="primary"
                icon={<PlusOutlined />}
              >
                Thêm DV
              </Button>
            }
            onFinish={async (values: any) => {

              setDichVu([
                ...dichVu,
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
              name="ten"
              label="Tên dịch vụ"
              rules={[{ required: true }]}
            />

            <ProFormDigit
              name="gia"
              label="Giá"
              rules={[{ required: true }]}
            />

            <ProFormDigit
              name="thoiGian"
              label="Thời gian (phút)"
              rules={[{ required: true }]}
            />

          </ModalForm>,
        ]}
      />

      {/* Modal sửa */}

      <ModalForm
        title="Sửa dịch vụ"
        open={!!editing}
        initialValues={editing}
        onOpenChange={(v) => !v && setEditing(null)}
        onFinish={async (values: any) => {

          const newList = dichVu.map(
            (i: any) =>
              i.id === editing.id
                ? { ...i, ...values }
                : i
          );

          setDichVu(newList);

          message.success('Đã sửa');

          setEditing(null);

          return true;
        }}
      >

        <ProFormText
          name="ten"
          label="Tên dịch vụ"
          rules={[{ required: true }]}
        />

        <ProFormDigit
          name="gia"
          label="Giá"
          rules={[{ required: true }]}
        />

        <ProFormDigit
          name="thoiGian"
          label="Thời gian"
          rules={[{ required: true }]}
        />

      </ModalForm>

    </>
  );
};

export default QuanLyDichVu;