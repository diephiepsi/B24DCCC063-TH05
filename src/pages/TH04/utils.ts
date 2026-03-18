export interface TruongDuLieu {
  id: string;
  tenTruong: string;
  kieuDuLieu: 'String' | 'Number' | 'Date';
}

export interface SoVanBang {
  id: string;
  nam: number;
  soHienTai: number; // Để tự động tăng số vào sổ
}

export interface QuyetDinh {
  id: string;
  soQD: string;
  ngayBanHanh: string;
  trichYeu: string;
  soVanBangId: string;
  luotTraCuu: number;
}

export interface VanBang {
  id: string;
  soVaoSo: number;
  soHieuVB: string;
  maSV: string;
  hoTen: string;
  ngaySinh: string;
  quyetDinhId: string;
  duLieuDong: Record<string, any>; // Lưu các trường cấu hình thêm
}