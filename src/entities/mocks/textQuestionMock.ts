import { QuestionTypeEnum } from "../question.entity";

export const textQuestionMock = {
    id: 3,
    quiz_id: 1, 
    content: "Mock text question",
    max_points: 5,
    question_type: QuestionTypeEnum.TEXT
  }