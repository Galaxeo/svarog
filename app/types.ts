type sessionType = {
  id: number;
  date: string;
  duration: number;
  topic: string;
};

type questionType = {
  id: number;
  session_id: number;
  user_id: string;
  question: string;
  ease_factor: string;
  next_date: string;
};

type answerType = {
  id: number;
  question_id: number;
  user_id: string;
  status: string;
  answer: string;
};

export type { sessionType, questionType, answerType };
