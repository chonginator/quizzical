import {
    amounts,
    difficulties,
    types
} from '../../constants';
import { capitalise } from '../../utils'

export const amountOptions = amounts.map(
    amount => ({
        id: amount,
        label: amount
    })
)

export const difficultyOptions = [{id: "", label: "Any Difficulty"}].concat(
    difficulties.map(
        difficulty => ({
            id: difficulty,
            label: capitalise(difficulty)
        })
    )
)

export const typeOptions = [{id: "", label: "Any Type"}].concat(
    types.map(
        type => ({
            id: type,
            label: capitalise(type)
        })
    )
)