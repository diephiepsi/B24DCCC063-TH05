export interface NhanVien {
  id: string;
  hoTen: string;
  gioiHanKhach: number;
  lichLamViec: string;
}

export interface LichHen {
  id: string;
  khachHang: string;
  nhanVienId: string;
  ngayHen: string;
  gioHen: string;
  trangThai: 'Chờ duyệt' | 'Xác nhận' | 'Hoàn thành' | 'Hủy';
  danhGia?: {
    soSao: number;
    binhLuan: string;
    phanHoi?: string;
  };
}

// Hàm tính điểm trung bình sao cho nhân viên
export const tinhDiemTrungBinh = (nhanVienId: string, dsLichHen: LichHen[]) => {
  const dsDaDanhGia = dsLichHen.filter(l => l.nhanVienId === nhanVienId && l.danhGia?.soSao);
  if (dsDaDanhGia.length === 0) return 0;
  const tong = dsDaDanhGia.reduce((acc, curr) => acc + (curr.danhGia?.soSao || 0), 0);
  return parseFloat((tong / dsDaDanhGia.length).toFixed(1));
};