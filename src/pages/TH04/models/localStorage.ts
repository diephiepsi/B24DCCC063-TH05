import { useState, useEffect } from 'react';

export default () => {
  // 1. Khởi tạo State từ LocalStorage (Lấy dữ liệu cũ nếu có)
  const [fields, setFields] = useState<any[]>(() => 
    JSON.parse(localStorage.getItem('th4_fields') || '[]')
  );
  const [ledgers, setLedgers] = useState<any[]>(() => 
    JSON.parse(localStorage.getItem('th4_ledgers') || '[]')
  );
  const [decisions, setDecisions] = useState<any[]>(() => 
    JSON.parse(localStorage.getItem('th4_decisions') || '[]')
  );
  const [diplomas, setDiplomas] = useState<any[]>(() => 
    JSON.parse(localStorage.getItem('th4_diplomas') || '[]')
  );

  // 2. Tự động đồng bộ ngược lại LocalStorage mỗi khi bất kỳ mảng nào thay đổi
  useEffect(() => {
    localStorage.setItem('th4_fields', JSON.stringify(fields));
    localStorage.setItem('th4_ledgers', JSON.stringify(ledgers));
    localStorage.setItem('th4_decisions', JSON.stringify(decisions));
    localStorage.setItem('th4_diplomas', JSON.stringify(diplomas));
  }, [fields, ledgers, decisions, diplomas]);

  // Trả về các hàm và dữ liệu để các Tab sử dụng
  return {
    fields, setFields,
    ledgers, setLedgers,
    decisions, setDecisions,
    diplomas, setDiplomas,
  };
};