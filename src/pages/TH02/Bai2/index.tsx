import React, { useState, useEffect, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import QuestionTable from './components/QuestionTable';
import QuestionForm from './components/QuestionForm';
import ExamGenerator from './components/ExamGenerator';
import ExamHistory from './components/ExamHistory';
import { Question, Exam } from './utils';

const Bai2Main = () => {
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('th02_questions');
    return saved ? JSON.parse(saved) : [];
  });

  const [exams, setExams] = useState<Exam[]>(() => {
    const saved = localStorage.getItem('th02_exams');
    return saved ? JSON.parse(saved) : [];
  });

  const [visible, setVisible] = useState(false);
  const [searchParams, setSearchParams] = useState<any>({});

  useEffect(() => {
    localStorage.setItem('th02_questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('th02_exams', JSON.stringify(exams));
  }, [exams]);

  // Logic lọc dữ liệu trực tiếp để fix lỗi tìm kiếm
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchSubject = !searchParams.subjectCode || q.subjectCode === searchParams.subjectCode;
      const matchLevel = !searchParams.level || q.level === searchParams.level;
      const matchBlock = !searchParams.knowledgeBlock || q.knowledgeBlock === searchParams.knowledgeBlock;
      return matchSubject && matchLevel && matchBlock;
    });
  }, [questions, searchParams]);

  const handleGenerate = (values: any) => {
    const { subjectCode, ...structure } = values;
    let selected: Question[] = [];
    try {
      Object.keys(structure).forEach(lvl => {
        const count = structure[lvl];
        if (count > 0) {
          const pool = questions.filter(q => q.subjectCode === subjectCode && q.level === lvl);
          if (pool.length < count) throw new Error(`Không đủ câu hỏi mức ${lvl} cho môn này!`);
          selected.push(...[...pool].sort(() => 0.5 - Math.random()).slice(0, count));
        }
      });
      if (selected.length === 0) return message.warning("Hãy chọn số lượng câu hỏi");
      setExams([{ id: `DE-${Date.now()}`, subjectCode, questions: selected, createdAt: new Date().toLocaleString() }, ...exams]);
      message.success('Tạo đề thi thành công!');
    } catch (e: any) { message.error(e.message); }
  };

  return (
    <PageContainer title="Quản lý Ngân hàng đề thi">
      <Tabs type="card">
        <Tabs.TabPane tab="Câu hỏi" key="1">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)} style={{ marginBottom: 16 }}>Thêm câu hỏi</Button>
          <QuestionTable questions={filteredQuestions} onSearch={setSearchParams} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tạo đề thi" key="2">
          <ExamGenerator onGenerate={handleGenerate} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lịch sử đề" key="3">
          <ExamHistory exams={exams} />
        </Tabs.TabPane>
      </Tabs>
      <QuestionForm visible={visible} onVisibleChange={setVisible} onFinish={async (v: any) => {
        setQuestions([{ ...v, id: `Q-${Date.now()}` }, ...questions]);
        setVisible(false);
      }} />
    </PageContainer>
  );
};
export default Bai2Main;