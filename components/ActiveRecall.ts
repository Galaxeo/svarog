import { questionType, answerType } from "@/app/types";
function updateQuestion(questionObj: questionType, answerObj: answerType) {
  // 1. Check database for questions to pull up and put into recalling screens
  // After doing research, may need to reconfigure answers/questions, questions will likely need to be updated with a value that determines "ease factor" based on user feedback on how much they know the question

  // This will then update the scheduling logic: if they get it wrong, the interval for recall gets reset to 1. If they get it right, then based on how easy it was, the interval for recall will increase.
  // Question: at what point do we stop asking questions? Perhaps give people this option to choose when they want questions to expire? After certain amount of times they got the question right? At some point though, if you get the question right over and over the interval will continue to increase to extremely long periods of time
  // After implementing basic scheduling, consider implementing with FSRS
  // 2. Pull up questions and answers in recalling screens, TODO: offer reasons behind grading of half-right answers
  // 3. Update database with new answers
}
