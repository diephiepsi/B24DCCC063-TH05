import { Card, Row, Col, List, Tag, Button, message } from 'antd';
import { ModalForm, ProFormText, ProFormDatePicker, ProFormSelect } from '@ant-design/pro-form';

const QuanLySoQuyetDinh = ({ ledgers, setLedgers, decisions, setDecisions }: any) => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Sổ văn bằng theo năm" extra={
          <Button type="link" onClick={() => {
            const nextYear = new Date().getFullYear();
            setLedgers([...ledgers, { id: Date.now().toString(), nam: nextYear, soHienTai: 0 }]);
          }}>+ Mở sổ mới</Button>
        }>
          <List
            dataSource={ledgers}
            renderItem={(item: any) => (
              <List.Item>
                Sổ năm {item.nam} <Tag color="blue">Số cuối: {item.soHienTai}</Tag>
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col span={16}>
        <Card title="Quyết định tốt nghiệp" extra={
          <ModalForm
            title="Thêm quyết định tốt nghiệp"
            trigger={<Button type="primary" size="small">Thêm QĐ</Button>}
            onFinish={async (v: any) => {
              setDecisions([...decisions, { ...v, id: Date.now().toString(), luotTraCuu: 0 }]);
              message.success('Đã thêm quyết định');
              return true;
            }}
          >
            <ProFormText name="soQD" label="Số quyết định" rules={[{ required: true }]} />
            <ProFormDatePicker name="ngayBanHanh" label="Ngày ban hành" />
            <ProFormText name="trichYeu" label="Trích yếu" />
            <ProFormSelect 
              name="soVanBangId" 
              label="Thuộc sổ văn bằng nào?" 
              options={ledgers.map((l: any) => ({ label: `Sổ năm ${l.nam}`, value: l.id }))} 
            />
          </ModalForm>
        }>
          <List
            dataSource={decisions}
            renderItem={(item: any) => (
              <List.Item>
                <b>{item.soQD}</b> - {item.trichYeu} (Tra cứu: {item.luotTraCuu})
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};
export default QuanLySoQuyetDinh;