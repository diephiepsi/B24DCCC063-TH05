// src/pages/TH05/index.tsx
import React, { useState, useEffect } from 'react';
import {
  Table,
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
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface Club {
  id: number;
  avatar: string;
  name: string;
  established: string;
  description: string;
  president: string;
  active: boolean;
}

interface Member {
  id: number;
  name: string;
  studentId: string;
  email: string;
  phone: string;
  joinDate: string;
}

const ClubManagement: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [members, setMembers] = useState<Record<number, Member[]>>({});
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [currentClub, setCurrentClub] = useState<Club | null>(null);
  const [currentMembers, setCurrentMembers] = useState<Member[]>([]);

  const [form] = Form.useForm();

  // Dữ liệu mẫu
  useEffect(() => {
    const initialClubs: Club[] = [
      {
        id: 1,
        avatar: 'https://picsum.photos/id/1015/200',
        name: 'Câu lạc bộ Lập trình',
        established: '2022-03-15',
        description: 'Nơi nghiên cứu, học hỏi và phát triển các công nghệ phần mềm hiện đại.',
        president: 'Nguyễn Văn A',
        active: true,
      },
      {
        id: 2,
        avatar: 'https://picsum.photos/id/201/200',
        name: 'Câu lạc bộ Âm nhạc',
        established: '2021-09-10',
        description: 'Giao lưu đam mê âm nhạc, tổ chức biểu diễn và sáng tác.',
        president: 'Trần Thị B',
        active: true,
      },
      {
        id: 3,
        avatar: 'https://picsum.photos/id/301/200',
        name: 'Câu lạc bộ Bóng đá',
        established: '2020-01-20',
        description: 'Tập luyện và tham gia các giải đấu bóng đá sinh viên.',
        president: 'Lê Minh C',
        active: false,
      },
    ];

    const initialMembers: Record<number, Member[]> = {
      1: [
        { id: 101, name: 'Phạm Thị Lan', studentId: '20231001', email: 'lan@gmail.com', phone: '0912345678', joinDate: '2024-09-15' },
        { id: 102, name: 'Trần Văn Hải', studentId: '20231045', email: 'hai@gmail.com', phone: '0987654321', joinDate: '2024-10-01' },
      ],
      2: [
        { id: 201, name: 'Nguyễn Thị Mai', studentId: '20232012', email: 'mai@gmail.com', phone: '0901234567', joinDate: '2024-08-20' },
      ],
    };

    setClubs(initialClubs);
    setMembers(initialMembers);
  }, []);

  // Tìm kiếm
  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchText.toLowerCase()) ||
      club.president.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Club> = [
    {
      title: 'Ảnh',
      dataIndex: 'avatar',
      width: 80,
      render: (url: string) => <Avatar src={url} size={48} shape="square" />,
    },
    {
      title: 'Tên câu lạc bộ',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <strong>{text}</strong>,
    },
    { title: 'Ngày thành lập', dataIndex: 'established', width: 140 },
    { title: 'Chủ nhiệm', dataIndex: 'president' },
    {
      title: 'Hoạt động',
      dataIndex: 'active',
      width: 110,
      render: (active: boolean) => (
        <Tag color={active ? 'success' : 'error'}>{active ? 'Đang hoạt động' : 'Tạm dừng'}</Tag>
      ),
    },
    {
      title: 'Thao tác',
      width: 260,
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<TeamOutlined />}
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onClick={() => viewMembers(record)}
          >
            Thành viên ({members[record.id]?.length || 0})
          </Button>
          
          
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
         
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingClub(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (club: Club) => {
    setEditingClub(club);
    form.setFieldsValue(club);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa câu lạc bộ này? Toàn bộ thành viên cũng sẽ bị xóa.',
      okType: 'danger',
      onOk() {
        setClubs(clubs.filter((c) => c.id !== id));
        const newMembers = { ...members };
        delete newMembers[id];
        setMembers(newMembers);
        message.success('Đã xóa câu lạc bộ thành công');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingClub) {
        setClubs(clubs.map((c) => (c.id === editingClub.id ? { ...c, ...values } : c)));
        message.success('Cập nhật câu lạc bộ thành công');
      } else {
        const newClub: Club = {
          id: Date.now(),
          ...values,
          avatar: values.avatar || 'https://picsum.photos/id/1005/200',
        };
        setClubs([...clubs, newClub]);
        message.success('Thêm câu lạc bộ mới thành công');
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingClub(null);
    });
  };

  // ==================== XEM THÀNH VIÊN ====================
  const viewMembers = (club: Club) => {
    setCurrentClub(club);
    setCurrentMembers(members[club.id] || []);
    setIsMemberModalOpen(true);
  };

  const memberColumns: ColumnsType<Member> = [
    { title: 'Họ tên', dataIndex: 'name' },
    { title: 'MSSV', dataIndex: 'studentId' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'SĐT', dataIndex: 'phone' },
    { title: 'Ngày tham gia', dataIndex: 'joinDate' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Title level={2}>Quản lý Câu lạc bộ</Title>
          <Space>
            <Input
              placeholder="Tìm kiếm tên CLB hoặc chủ nhiệm..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 320 }}
              allowClear
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Thêm câu lạc bộ mới
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredClubs}
          rowKey="id"
          pagination={{ pageSize: 8 }}
          bordered
        />

        {/* Modal Thêm / Sửa CLB */}
        <Modal
          title={editingClub ? 'Chỉnh sửa câu lạc bộ' : 'Thêm mới câu lạc bộ'}
          visible={isModalOpen}           // Dùng open thay vì visible (AntD 5.x)
          onOk={handleModalOk}
          onCancel={() => setIsModalOpen(false)}
          width={720}
          okText="Lưu"
        >
          <Form form={form} layout="vertical">
            <Form.Item name="avatar" label="URL Ảnh đại diện">
              <Input placeholder="https://example.com/avatar.jpg" />
            </Form.Item>
            <Form.Item name="name" label="Tên câu lạc bộ" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="established" label="Ngày thành lập">
              <Input type="date" />
            </Form.Item>
            <Form.Item name="president" label="Chủ nhiệm CLB">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Mô tả">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="active" label="Trạng thái hoạt động" valuePropName="checked">
              <Switch checkedChildren="Đang hoạt động" unCheckedChildren="Tạm dừng" />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal Xem Danh sách Thành viên */}
        <Modal
          title={currentClub ? `Thành viên CLB: ${currentClub.name}` : 'Danh sách thành viên'}
          visible={isMemberModalOpen}
          onCancel={() => setIsMemberModalOpen(false)}
          width={900}
          footer={[
            <Button key="close" onClick={() => setIsMemberModalOpen(false)}>
              Đóng
            </Button>,
          ]}
        >
          <Table
            columns={memberColumns}
            dataSource={currentMembers}
            rowKey="id"
            pagination={false}
            locale={{ emptyText: 'Chưa có thành viên nào trong câu lạc bộ này' }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ClubManagement;