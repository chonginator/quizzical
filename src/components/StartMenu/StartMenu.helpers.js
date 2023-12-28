import {
    NUMBER_OF_QUESTIONS_OPTIONS,
    QUESTION_DIFFICULTY_OPTIONS,
    QUESTION_TYPE_OPTIONS,
    ANY_DIFFICULTY,
    ANY_QUESTION_TYPE
} from '../../constants';
import { capitalise } from '../../utils'

export const numberOfQuestionsOptions = NUMBER_OF_QUESTIONS_OPTIONS.map(
    amount => ({
        id: amount,
        name: amount
    })
)

export const questionDifficultyOptions = [ANY_DIFFICULTY, 
    ...QUESTION_DIFFICULTY_OPTIONS.map(
        difficulty => ({
            id: difficulty,
            name: capitalise(difficulty)
        })
    )
]

export const questionTypeOptions = [ANY_QUESTION_TYPE,
    ...QUESTION_TYPE_OPTIONS.map(
        type => ({
            id: type,
            name: capitalise(type)
        })
    )
]