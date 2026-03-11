import React from 'react';
import { ModalForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { levels, blocks, subjects } from '../utils';

const QuestionForm = ({ visible, onVisibleChange, onFinish }: any) => (
  <ModalForm title="Thêm câu hỏi mới" visible={visible} onVisibleChange={onVisibleChange} onFinish={onFinish}>
    <ProFormSelect name="subjectCode" label="Môn học" options={subjects} rules={[{ required: true }]} />
    <ProFormTextArea name="content" label="Nội dung" rules={[{ required: true }]} />
    <ProFormSelect name="level" label="Mức độ" options={levels.map(l => ({ label: l, value: l }))} rules={[{ required: true }]} />
    <ProFormSelect name="knowledgeBlock" label="Khối kiến thức" options={blocks.map(b => ({ label: b, value: b }))} rules={[{ required: true }]} />
  </ModalForm>
);
export default QuestionForm;