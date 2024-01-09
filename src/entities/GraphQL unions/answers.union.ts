import { createUnionType } from "@nestjs/graphql";
import { ChoiceAnswer } from "../choice.answer.entity";
import { SortingAnswer } from "../sorting.answer.entity";
import { TextAnswer } from "../text.answer.entity";

export const AnswersUnion = createUnionType({
    name: 'AnswersUnion',
    types: () => [
        ChoiceAnswer, 
        SortingAnswer, 
        TextAnswer
    ] as const,
    resolveType(answer) {
        if (typeof answer.is_correct === 'boolean') {
            return ChoiceAnswer;
        }
        if (answer.order) {
            return SortingAnswer;
        }

        return TextAnswer;
    }
});