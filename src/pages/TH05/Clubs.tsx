import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Form,
  Switch,
  message,
  Space,
  Tag,
  Avatar,
  Typography,
  Card,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import TinyEditor from '@/components/TinyEditor'; // Đảm bảo dự án có file này

const { Title } = Typography;

const ClubManagement = (props: any) => {
  // Lấy dữ liệu từ model truyền xuống qua props
  const { clubs, setClubs, apps } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMembersOpen, setIsViewMembersOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<any>(null);
  const [selectedClub, setSelectedClub] = useState<any>(null);
  const [form] = Form.useForm();

  // --- XỬ LÝ DỮ LIỆU ---

  const handleAdd = () => {
    setEditingClub(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingClub(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setClubs(clubs.filter((c: any) => c.id !== id));
    message.success('Đã xóa câu lạc bộ thành công');
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingClub) {
        // Cập nhật CLB hiện có
        setClubs(clubs.map((c: any) => (c.id === editingClub.id ? { ...c, ...values } : c)));
        message.success('Cập nhật thành công');
      } else {
        // Thêm mới CLB
        const newClub = {
          ...values,
          id: Date.now().toString(),
          avatar: values.avatar || 'https://picsum.photos/id/1005/200',
        };
        setClubs([...clubs, newClub]);
        message.success('Thêm mới thành công');
      }
      setIsModalOpen(false);
    });
  };

  // --- CẤU HÌNH BẢNG (COLUMNS) ---

  const columns: ProColumns[] = [
    {
      title: 'Ảnh',
      dataIndex: 'avatar',
      search: false,
      render: (url: any) => <Avatar src={typeof url === 'string' ? url : url?.[0]?.thumbUrl} size={48} shape="square" />,
    },
    {
      title: 'Tên câu lạc bộ',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Ngày thành lập',
      dataIndex: 'established',
      valueType: 'date',
      sorter: true,
    },
    {
      title: 'Chủ nhiệm',
      dataIndex: 'president',
    },
    {
      title: 'Hoạt động',
      dataIndex: 'active',
      valueEnum: {
        true: { text: 'Đang hoạt động', status: 'Success' },
        false: { text: 'Tạm dừng', status: 'Error' },
      },
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      width: 150,
      render: (_, record) => [
        <Button 
          key="edit" 
          type="link" 
          icon={<EditOutlined />} 
          onClick={() => handleEdit(record)} 
        />,
        <Popconfirm 
          key="delete" 
          title="Xóa CLB này?" 
          onConfirm={() => handleDelete(record.id)}
        >
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Popconfirm>,
        <Button 
          key="members" 
          type="link" 
          icon={<TeamOutlined />} 
          onClick={() => {
            setSelectedClub(record);
            setIsViewMembersOpen(true);
          }}
        />,
      ],
    },
  ];

  return (
    <Card bordered={false}>
      {/* ProTable tự động xử lý Tìm kiếm và Sort dựa trên columns */}
      <ProTable
        headerTitle={<Title level={4} style={{ margin: 0 }}>Quản lý Câu lạc bộ</Title>}
        columns={columns}
        dataSource={clubs}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        search={{ labelWidth: 'auto' }}
        toolBarRender={() => [
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm mới
          </Button>,
        ]}
      />

      {/* MODAL THÊM/SỬA */}
      <Modal
        title={editingClub ? 'Chỉnh sửa câu lạc bộ' : 'Thêm mới câu lạc bộ'}
        visible={isModalOpen} // Dùng visible cho Antd v4
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        width={720}
        okText="Lưu"
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="avatar" label="URL Ảnh đại diện">
            <Input placeholder="https://example.com/avatar.jpg" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Tên câu lạc bộ"
            rules={[{ required: true, message: 'Vui lòng nhập tên câu lạc bộ' }]}
          >
            <Input placeholder="Ví dụ: Câu lạc bộ Lập trình" />
          </Form.Item>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item name="established" label="Ngày thành lập">
              <Input type="date" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="president" label="Chủ nhiệm CLB">
              <Input placeholder="Họ tên chủ nhiệm" />
            </Form.Item>
          </div>

          <Form.Item name="description" label="Mô tả (HTML)">
            <TinyEditor />
          </Form.Item>

          <Form.Item name="active" label="Trạng thái hoạt động" valuePropName="checked">
            <Switch checkedChildren="Hoạt động" unCheckedChildren="Tạm dừng" />
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL XEM THÀNH VIÊN */}
      <Modal
        title={`Danh sách thành viên: ${selectedClub?.name}`}
        visible={isViewMembersOpen}
        onCancel={() => setIsViewMembersOpen(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <ProTable
          search={false}
          toolBarRender={false}
          dataSource={apps.filter((a: any) => a.clubId === selectedClub?.id && a.status === 'Approved')}
          columns={[
            { title: 'Họ tên', dataIndex: 'fullName' },
            { title: 'Email', dataIndex: 'email' },
            { title: 'Số điện thoại', dataIndex: 'phone' },
            { title: 'Ngày tham gia', dataIndex: 'date', valueType: 'date' },
          ]}
          rowKey="id"
        />
      </Modal>
    </Card>
  );
};

export default ClubManagement;