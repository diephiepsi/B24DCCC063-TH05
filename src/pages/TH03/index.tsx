import { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs } from 'antd';

import QuanLyNhanVien from './QuanLyNhanVien';
import QuanLyLichHen from './QuanLyLichHen';
import DanhGiaDichVu from './DanhGiaDichVu';
import ThongKeBaoCao from './ThongKeBaoCao';
import QuanLyDichVu from './QuanLyDichVu';

const Bai3Main = () => {

  const [nhanVien, setNhanVien] = useState(() =>
    JSON.parse(
      localStorage.getItem('th3_nv') ||
        JSON.stringify([
          {
            id: '1',
            hoTen: 'Nguyễn Văn A',
            gioiHanKhach: 5,
            lichLamViec: '9h-17h Thứ 6',
          },
          {
            id: '2',
            hoTen: 'Lê Thị B',
            gioiHanKhach: 3,
            lichLamViec: '8h-12h Thứ 7',
          },
        ])
    )
  );

  const [lichHen, setLichHen] = useState(() =>
    JSON.parse(
      localStorage.getItem('th3_lh') ||
        JSON.stringify([
          {
            id: 'l1',
            khachHang: 'Anh Tuấn',
            nhanVienId: '1',
            ngayHen: '2026-03-12',
            gioHen: '09:00',
            trangThai: 'Hoàn thành',
            danhGia: {
              soSao: 5,
              binhLuan: 'Phục vụ tận tâm',
            },
          },
        ])
    )
  );

  const [dichVu, setDichVu] = useState(() =>
    JSON.parse(
      localStorage.getItem('th3_dv') ||
        JSON.stringify([
          {
            id: 'dv1',
            ten: 'Cắt tóc',
            gia: 50000,
            thoiGian: 30,
          },
        ])
    )
  );

  useEffect(() => {
    localStorage.setItem('th3_nv', JSON.stringify(nhanVien));
    localStorage.setItem('th3_lh', JSON.stringify(lichHen));
    localStorage.setItem('th3_dv', JSON.stringify(dichVu));
  }, [nhanVien, lichHen, dichVu]);

  return (
    <PageContainer title="HỆ THỐNG ĐẶT LỊCH DỊCH VỤ - TH03">

      <Tabs
        type="card"
        style={{
          background: '#fff',
          padding: 16,
          borderRadius: 8,
        }}
      >

        {/* TAB 1 */}

        <Tabs.TabPane tab="1. Nhân viên & Dịch vụ" key="1">

          <QuanLyNhanVien
            nhanVien={nhanVien}
            setNhanVien={setNhanVien}
            lichHen={lichHen}
          />

          <div style={{ marginTop: 30 }} />

          <QuanLyDichVu
            dichVu={dichVu}
            setDichVu={setDichVu}
          />

        </Tabs.TabPane>


        {/* TAB 2 */}

        <Tabs.TabPane tab="2. Quản lý lịch hẹn" key="2">

          <QuanLyLichHen
            lichHen={lichHen}
            setLichHen={setLichHen}
            nhanVien={nhanVien}
            dichVu={dichVu}
          />

        </Tabs.TabPane>


        {/* TAB 3 */}

        <Tabs.TabPane tab="3. Đánh giá & Phản hồi" key="3">

          <DanhGiaDichVu
            lichHen={lichHen}
            setLichHen={setLichHen}
          />

        </Tabs.TabPane>


        {/* TAB 4 */}

        <Tabs.TabPane tab="4. Báo cáo thống kê" key="4">

          <ThongKeBaoCao lichHen={lichHen} />

        </Tabs.TabPane>

      </Tabs>

    </PageContainer>
  );
};

export default Bai3Main;