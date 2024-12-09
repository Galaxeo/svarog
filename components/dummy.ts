const dummySessions = [
  {
    date: "2024-11-22",
    duration: 60,
    id: "ff9cd5d1-c74d-49a6-b834-99cd4d7530b8",
    topic: "Computers",
    user_id: "7f79012e-f323-4fa0-863d-435eddeb479b",
  },
  {
    date: "2024-11-22",
    duration: 50,
    id: "097a0401-e23c-4046-9b9b-e34f789c7522",
    topic: "Math",
    user_id: "7f79012e-f323-4fa0-863d-435eddeb479b",
  },
];
// TODO: Think about whether or not we need answer history when we're accessing answers anyways
const dummyQuestions = [
  {
    id: "a5ecd9ef-b761-4cb3-905d-1c8477ee6e5d",
    session_id: "ff9cd5d1-c74d-49a6-b834-99cd4d7530b8",
    user_id: "7f79012e-f323-4fa0-863d-435eddeb479b",
    question: "What is a computer?",
  },
  {
    id: "088a19ca-2d0b-46a1-90fd-c3e33593246a",
    session_id: "097a0401-e23c-4046-9b9b-e34f789c7522",
    user_id: "7f79012e-f323-4fa0-863d-435eddeb479b",
    question: "What is 2 + 2?",
  },
  // {
  //   id: 3,
  //   session_id: "ff9cd5d1-c74d-49a6-b834-99cd4d7530b8",
  //   user_id: "7f79012e-f323-4fa0-863d-435eddeb479b",
  //   question: "What is dog",
  // },
];
const dummyAnswers = [
  {
    id: 1,
    question_id: 1,
    user_id: "7f79012e-f323-4fa0-863d-435eddeb479b",
    status: "Y",
    answer: "A computer",
  },
  {
    id: 2,
    question_id: 1,
    user_id: "7f79012e-f323-4fa0-863d-435eddeb479b",
    status: "H",
    answer: "An object",
  },
  {
    id: 3,
    question_id: 2,
    user_id: "7f79012e-f323-4fa0-863d-435eddeb479b",
    status: "N",
    answer: "4",
  },
];
export { dummySessions, dummyQuestions, dummyAnswers };
