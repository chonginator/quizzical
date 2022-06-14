import {
    amounts,
    difficulties,
    types
} from '../../constants';

export const amountOptions = amounts.map((amount, index) => ({'id': index, 'name': amount}))
export const difficultyOptions = difficulties.map((difficulty, index) => ({'id': index, 'name': difficulty}))
export const typeOptions = types.map((type, index) => ({'id': index, 'name': type}))