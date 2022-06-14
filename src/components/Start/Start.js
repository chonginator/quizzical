import React, { useEffect, useState } from 'react';

import {
    baseUrl,
    categoryUrl,
} from '../../constants';
import useFetch from '../../hooks/useFetch';
import ControlPane from '../ControlPane';
import Button from '../Button';

import {
    amountOptions,
    difficultyOptions,
    typeOptions
} from './Start.helpers';

function Start({ handleStartGame, setApiUrl }) {
    const { data, error, loading } = useFetch(categoryUrl)
    const [category, setCategoryId] = useState(0)
    const [amount, setAmount] = useState(amountOptions[0]['name'])
    const [difficulty, setDifficulty] = useState("")
    const [type, setType] = useState("")

    useEffect(() => {
        setApiUrl(
            baseUrl +
            new URLSearchParams({
                category,
                amount,
                difficulty,
                type
            }).toString()
        )
    },
    [
        category,
        amount,
        difficulty,
        type,
        setApiUrl
    ])

    return (
        <main>
            <h1>Quizzical</h1>

            <p>Let's get quizzical</p>

            <ControlPane
                title="Category"
                options={data['trivia_categories'] ?? []}
                currentOption={category}
                handleSelectOption={setCategoryId}
            />

            <ControlPane
                title="Number of Questions"
                options={amountOptions}
                currentOption={amount}
                handleSelectOption={setAmount}
            />

            <ControlPane
                title="Difficulty"
                options={difficultyOptions}
                currentOption={difficulty}
                handleSelectOption={setDifficulty}
            />

            <ControlPane
                title="Question Type"
                options={typeOptions}
                currentOption={type}
                handleSelectOption={setType}
            />

            <Button onClick={() => handleStartGame(true)} />
        </main>
    )
}

export default Start;