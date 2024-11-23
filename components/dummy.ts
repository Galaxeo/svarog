const dummySessions = [
  {
    date: "2024-11-22",
    duration: 60,
    id: 1,
    topic: "Computers",
    user_id: "Justin",
  },
  {
    date: "2024-11-22",
    duration: 50,
    id: 2,
    topic: "Math",
    user_id: "Justin",
  },
];
// TODO: Think about whether or not we need answer history when we're accessing answers anyways
const dummyQuestions = [
  {
    id: 1,
    session_id: 1,
    user_id: "Justin",
    question: "What is a computer?",
  },
  {
    id: 2,
    session_id: 2,
    user_id: "Justin",
    question: "What is 2 + 2?",
  },
];
const dummyAnswers = [
  {
    id: 1,
    question_id: 1,
    user_id: "Justin",
    status: "Y",
    answer: "A computer",
  },
  {
    id: 2,
    question_id: 1,
    user_id: "Justin",
    status: "H",
    answer: "An object",
  },
  {
    id: 3,
    question_id: 2,
    user_id: "Justin",
    status: "N",
    answer: "4",
  },
];
export { dummySessions, dummyQuestions, dummyAnswers };
