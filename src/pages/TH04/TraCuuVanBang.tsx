import React, { useState } from 'react';
import { Card, Form, Input, Button, Row, Col, message, Descriptions, Divider } from 'antd';

const TraCuuVanBang = ({ diplomas, decisions, setDecisions }: any) => {
  const [result, setResult] = useState<any>(null);

  const onSearch = (values: any) => {
    // Đếm số tham số được nhập
    const filledParams = Object.values(values).filter(v => !!v).length;
    if (filledParams < 2) {
      return message.warning('Vui lòng nhập ít nhất 2 tham số tra cứu!');
    }

    const found = diplomas.find((v: any) => 
      (values.soHieuVB && v.soHieuVB === values.soHieuVB) ||
      (values.maSV && v.maSV === values.maSV) ||
      (values.hoTen && v.hoTen.includes(values.hoTen))
    );

    if (found) {
      setResult(found);
      // Ghi nhận lượt tra cứu cho quyết định đó
      setDecisions(decisions.map((d: any) => d.id === found.quyetDinhId ? { ...d, luotTraCuu: d.luotTraCuu + 1 } : d));
      message.success('Tìm thấy thông tin văn bằng!');
    } else {
      setResult(null);
      message.error('Không tìm thấy văn bằng phù hợp');
    }
  };

  return (
    <Card title="Tra cứu văn bằng hệ thống">
      <Form layout="vertical" onFinish={onSearch}>
        <Row gutter={16}>
          <Col span={8}><Form.Item name="soHieuVB" label="Số hiệu VB"><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="maSV" label="Mã sinh viên"><Input /></Form.Item></Col>
          <Col span={8}><Form.Item name="hoTen" label="Họ tên"><Input /></Form.Item></Col>
        </Row>
        <Button type="primary" htmlType="submit">Tra cứu ngay</Button>
      </Form>

      {result && (
        <div style={{ marginTop: 30 }}>
          <Divider>KẾT QUẢ TRA CỨU</Divider>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Họ tên">{result.hoTen}</Descriptions.Item>
            <Descriptions.Item label="Mã SV">{result.maSV}</Descriptions.Item>
            <Descriptions.Item label="Số hiệu">{result.soHieuVB}</Descriptions.Item>
            <Descriptions.Item label="Số vào sổ">{result.soVaoSo}</Descriptions.Item>
            {Object.keys(result.duLieuDong).map(key => (
              <Descriptions.Item key={key} label={key}>{result.duLieuDong[key]}</Descriptions.Item>
            ))}
          </Descriptions>
        </div>
      )}
    </Card>
  );
};
export default TraCuuVanBang;