import React from 'react';
import ProTable from '@ant-design/pro-table';
import { levels, blocks, subjects } from '../utils';

const QuestionTable = ({ questions, onSearch }: { questions: any[], onSearch: (p: any) => void }) => {
  const columns: any = [
    { title: 'Nội dung', dataIndex: 'content', ellipsis: true, search: false },
    { 
      title: 'Môn học', 
      dataIndex: 'subjectCode', 
      valueType: 'select',
      valueEnum: subjects.reduce((acc, cur) => ({ ...acc, [cur.value]: { text: cur.label } }), {}),
    },
    { 
      title: 'Mức độ', 
      dataIndex: 'level', 
      valueType: 'select',
      valueEnum: levels.reduce((acc, cur) => ({ ...acc, [cur]: { text: cur } }), {}),
    },
    { 
      title: 'Khối kiến thức', 
      dataIndex: 'knowledgeBlock', 
      valueType: 'select',
      valueEnum: blocks.reduce((acc, cur) => ({ ...acc, [cur]: { text: cur } }), {}),
    },
  ];

  return (
    <ProTable
      dataSource={questions}
      rowKey="id"
      columns={columns}
      onSubmit={onSearch}
      onReset={() => onSearch({})}
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 5 }}
    />
  );
};
export default QuestionTable;