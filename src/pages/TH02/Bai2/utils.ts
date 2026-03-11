export interface Question {
  id: string;
  content: string;
  subjectCode: string;
  level: string;
  knowledgeBlock: string;
}

export interface Exam {
  id: string;
  subjectCode: string;
  questions: Question[];
  createdAt: string;
}

export const levels = ['Dễ', 'Trung bình', 'Khó', 'Rất khó'];
export const blocks = ['Tổng quan', 'Chuyên sâu', 'Ứng dụng'];
export const subjects = [
  { label: 'Lập trình Web', value: 'IT01' },
  { label: 'Cấu trúc dữ liệu', value: 'IT02' },
];