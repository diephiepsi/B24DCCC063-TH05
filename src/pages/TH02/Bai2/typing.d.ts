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