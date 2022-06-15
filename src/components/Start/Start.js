import React, { useEffect, useState } from 'react';

import {
    baseUrl,
    categoryUrl,
    amounts,
    difficulties,
    types
} from '../../constants';
import useFetch from '../../hooks/useFetch';
import ControlPane from '../ControlPane';
import Button from '../Button';

function Start({ handleStartGame, setApiUrl }) {
    const { data, error, loading } = useFetch(categoryUrl)
    const [categoryId, setCategoryId] = useState(0)
    const [amount, setAmount] = useState(amounts[0])
    const [difficulty, setDifficulty] = useState(difficulties[0])
    const [type, setType] = useState(types[0])

    useEffect(() => {
        setApiUrl(
            baseUrl +
            new URLSearchParams({
                categoryId,
                amount,
                difficulty,
                type
            }).toString()
        )
    },
    [
        categoryId,
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
                currentOption={categoryId}
                handleSelectOption={setCategoryId}
            />

            <ControlPane
                title="Number of Questions"
                options={amounts}
                currentOption={amount}
                handleSelectOption={setAmount}
            />

            <ControlPane
                title="Difficulty"
                options={difficulties}
                currentOption={difficulty}
                handleSelectOption={setDifficulty}
            />

            <ControlPane
                title="Question Type"
                options={types}
                currentOption={type}
                handleSelectOption={setType}
            />

            <Button onClick={() => handleStartGame(true)} />
        </main>
    )
}

export default Start;