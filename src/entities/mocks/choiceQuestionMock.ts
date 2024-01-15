import { QuestionTypeEnum } from "../question.entity"

export const choiceQuestionMock = {
    id: 1,
    quiz_id: 1,
    content: "Mock choice question",
    max_points: 3.5,
    question_type: QuestionTypeEnum.CHOICE
}