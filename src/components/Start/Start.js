import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
    baseUrl,
    categoryUrl,
} from '../../constants';

import {
    amountOptions,
    difficultyOptions,
    typeOptions
} from './Start.helpers';

import useFetch from '../../hooks/useFetch';
import ControlPane from '../ControlPane';
import Button from '../Button';

function Start({ handleStartGame, setApiUrl }) {
    const { fetchMyAPI, data, error, loading } = useFetch()
    const [categories, setCategories] = useState([])
    const [category, setCategoryId] = useState("")
    const [amount, setAmount] = useState(amountOptions[0].id)
    const [difficulty, setDifficulty] = useState(difficultyOptions[0].id)
    const [type, setType] = useState(typeOptions[0].id)

    useEffect(() => {
        if (!localStorage.getItem('trivia_categories')) {
            fetchMyAPI(categoryUrl)
        }
    }, [])

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

    useEffect(() => {
        // Get categories state from localStorage, if any
        const categories = localStorage.getItem('trivia_categories')

        if (categories) {
            setCategories(JSON.parse(categories))
        } else {
            if (data) {
                const categories = 
                    [{ id: "", label: "Any Category"}].concat(
                        data['trivia_categories'].map(({ id, name }) => ({
                            id,
                            label: name
                        }))
                    )
                setCategories(categories)
                localStorage.setItem('trivia_categories', JSON.stringify(categories))
            }
        }
    }, [data])

    return (
        <Wrapper>
            <Title>Quizzical</Title>

            <Subtitle>Let's get quizzical</Subtitle>

            <div>
                <ControlPane
                    title="Category"
                    options={categories}
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

            </div>

            <StartButton onClick={() => handleStartGame(true)}>
                Start quiz
            </StartButton>
        </Wrapper>
    )
}

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
`

const Title = styled.h1`
    font-family: var(--font-family-primary);
    font-size: 2.3rem;
    text-align: center;
`

const Subtitle = styled.p`
    font-family: var(--font-family-secondary);
    text-align: center;
`

const StartButton = styled(Button)`
    margin-top: 1em;
    margin-left: auto;
    margin-right: auto;
    padding: 1em 2.5em;
`

export default Start;