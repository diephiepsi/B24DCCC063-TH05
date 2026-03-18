import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';

const CauHinhBieuMau = ({ fields, setFields }: any) => {
  const columns: any[] = [
    { title: 'Tên trường thông tin', dataIndex: 'tenTruong' },
    { title: 'Kiểu dữ liệu', dataIndex: 'kieuDuLieu' },
    {
      title: 'Thao tác',
      render: (_: any, record: any) => (
        <Popconfirm title="Xóa trường này?" onConfirm={() => setFields(fields.filter((f: any) => f.id !== record.id))}>
          <a style={{ color: 'red' }}>Xóa</a>
        </Popconfirm>
      ),
    },
  ];

  return (
    <ProTable
      headerTitle="Cấu hình biểu mẫu phụ lục"
      dataSource={fields}
      rowKey="id"
      search={false}
      toolBarRender={() => [
        <ModalForm
          title="Thêm trường thông tin"
          trigger={<Button type="primary" icon={<PlusOutlined />}>Thêm trường</Button>}
          onFinish={async (v: any) => {
            setFields([...fields, { ...v, id: Date.now().toString() }]);
            message.success('Đã thêm cấu hình');
            return true;
          }}
        >
          <ProFormText name="tenTruong" label="Tên trường (VD: Nơi sinh, Dân tộc)" rules={[{ required: true }]} />
          <ProFormSelect 
            name="kieuDuLieu" 
            label="Kiểu dữ liệu" 
            options={['String', 'Number', 'Date'].map(i => ({ label: i, value: i }))} 
            rules={[{ required: true }]} 
          />
        </ModalForm>
      ]}
      columns={columns}
    />
  );
};
export default CauHinhBieuMau;