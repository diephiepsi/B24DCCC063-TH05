import ProTable from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormDatePicker, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';

const ThongTinVanBang = ({ diplomas, setDiplomas, fields, decisions, ledgers, setLedgers }: any) => {
  
  const handleAdd = async (values: any) => {
    const qd = decisions.find((d: any) => d.id === values.quyetDinhId);
    const ledger = ledgers.find((l: any) => l.id === qd.soVanBangId);
    
    // Logic: Tự động tăng số vào sổ
    const newSoVaoSo = ledger.soHienTai + 1;
    
    // Cập nhật sổ văn bằng
    setLedgers(ledgers.map((l: any) => l.id === ledger.id ? { ...l, soHienTai: newSoVaoSo } : l));
    
    // Tách dữ liệu mặc định và dữ liệu động
    const { soHieuVB, maSV, hoTen, ngaySinh, quyetDinhId, ...dynamicData } = values;
    
    const newVB = {
      id: Date.now().toString(),
      soVaoSo: newSoVaoSo,
      soHieuVB, maSV, hoTen, ngaySinh, quyetDinhId,
      duLieuDong: dynamicData
    };

    setDiplomas([newVB, ...diplomas]);
    message.success(`Đã cấp bằng! Số vào sổ: ${newSoVaoSo}`);
    return true;
  };

  return (
    <ProTable
      headerTitle="Danh sách văn bằng đã cấp"
      dataSource={diplomas}
      columns={[
        { title: 'Số vào sổ', dataIndex: 'soVaoSo' },
        { title: 'Số hiệu', dataIndex: 'soHieuVB' },
        { title: 'Mã SV', dataIndex: 'maSV' },
        { title: 'Họ tên', dataIndex: 'hoTen' },
      ]}
      toolBarRender={() => [
        <ModalForm
          title="Cấp văn bằng mới"
          trigger={<Button type="primary" icon={<PlusOutlined />}>Thêm văn bằng</Button>}
          onFinish={handleAdd}
        >
          <ProFormSelect 
            name="quyetDinhId" 
            label="Quyết định tốt nghiệp" 
            options={decisions.map((d: any) => ({ label: d.soQD, value: d.id }))} 
            rules={[{ required: true }]} 
          />
          <ProFormText name="soHieuVB" label="Số hiệu văn bằng" rules={[{ required: true }]} />
          <ProFormText name="maSV" label="Mã sinh viên" rules={[{ required: true }]} />
          <ProFormText name="hoTen" label="Họ tên" rules={[{ required: true }]} />
          <ProFormDatePicker name="ngaySinh" label="Ngày sinh" rules={[{ required: true }]} />
          
          <div style={{ padding: '10px', background: '#f5f5f5', marginBottom: 20 }}>
            <p><b>Thông tin phụ lục (Cấu hình động):</b></p>
            {fields.map((f: any) => (
              f.kieuDuLieu === 'Date' ? <ProFormDatePicker key={f.id} name={f.tenTruong} label={f.tenTruong} /> :
              f.kieuDuLieu === 'Number' ? <ProFormDigit key={f.id} name={f.tenTruong} label={f.tenTruong} /> :
              <ProFormText key={f.id} name={f.tenTruong} label={f.tenTruong} />
            ))}
          </div>
        </ModalForm>
      ]}
      search={false}
    />
  );
};
export default ThongTinVanBang;