import {
    NUMBER_OF_QUESTIONS_OPTIONS,
    QUESTION_DIFFICULTY_OPTIONS,
    QUESTION_TYPE_OPTIONS
} from '../../constants';
import { capitalise } from '../../utils'

export const numberOfQuestionsOptions = NUMBER_OF_QUESTIONS_OPTIONS.map(
    amount => ({
        id: amount,
        label: amount
    })
)

export const questionDifficultyOptions = [{id: "", label: "Any Difficulty"}].concat(
    QUESTION_DIFFICULTY_OPTIONS.map(
        difficulty => ({
            id: difficulty,
            label: capitalise(difficulty)
        })
    )
)

export const questionTypeOptions = [{id: "", label: "Any Type"}].concat(
    QUESTION_TYPE_OPTIONS.map(
        type => ({
            id: type,
            label: capitalise(type)
        })
    )
)