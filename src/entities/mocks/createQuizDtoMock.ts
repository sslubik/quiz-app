import { QuestionTypeEnum } from "../question.entity";
import { CreateQuizDto } from "../dto/create.quiz.dto";

export const createQuizDtoMock = {
    user_id: 1,
    name: "Quiz nr. 1",
    questionsDto: [
        {
            content: 'Choice question nr. 1',
            question_type: QuestionTypeEnum.CHOICE,
            max_points: 5,
            choiceAnswersDto: [
                {
                    content: 'Choice answer nr. 1',
                    is_correct: true
                },
                {
                    content: 'Choice answer nr. 2',
                    is_correct: false
                },
                {
                    content: 'Choice answer nr. 3',
                    is_correct: true
                }
            ],
            sortingAnswersDto: undefined,
            textAnswersDto: undefined
        },
        {
            content: 'Sorting question nr. 1',
            question_type: QuestionTypeEnum.SORTING,
            max_points: 3.5,
            choiceAnswersDto: undefined,
            sortingAnswersDto: [
                {
                    content: 'Sorting answer nr. 1',
                    order: 2
                },
                {
                    content: 'Sorting answer nr. 2',
                    order: 1
                },
                {
                    content: 'Sorting answer nr. 3',
                    order: 3
                }
            ],
            textAnswersDto: undefined
        },
        {
            content: 'Text question nr. 1',
            question_type: QuestionTypeEnum.TEXT,
            max_points: 7,
            choiceAnswersDto: undefined,
            sortingAnswersDto: undefined,
            textAnswersDto: [
                {
                    content: 'Text answer nr. 1'
                },
                {
                    content: 'Text answer nr. 2'
                }
            ]
        }
    ]
}