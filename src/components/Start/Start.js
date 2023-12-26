import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
    TRIVIA_API_URL,
    TRIVIA_CATEGORIES_URL,
} from '../../constants';

import {
    numberOfQuestionsOptions,
    questionDifficultyOptions,
    questionTypeOptions
} from './Start.helpers';

import useFetch from '../../hooks/useFetch';
import ControlPane from '../ControlPane';
import Button from '../Button';
import Loader from '../Loader';

function Start({ handleStartGame, setApiUrl }) {
    const { fetchMyAPI, data, error, loading } = useFetch()
    const [categories, setCategories] = useState([])
    const [category, setCategoryId] = useState("")
    const [amount, setAmount] = useState(numberOfQuestionsOptions[0].id)
    const [difficulty, setDifficulty] = useState(questionDifficultyOptions[0].id)
    const [type, setType] = useState(questionTypeOptions[0].id)

    console.log({ data })
    console.log({ categories })

    useEffect(() => {
        if (!localStorage.getItem('trivia_categories')) {
            fetchMyAPI(TRIVIA_CATEGORIES_URL)
        }
    }, [])

    useEffect(() => {
        setApiUrl(
            TRIVIA_API_URL +
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

            {/* Show a loader if the categories data is still loading */}
            {loading && <Loader loading={loading}/>}

            {!loading &&
                <div>
                    <ControlPane
                        title="Category"
                        options={categories}
                        currentOption={category}
                        handleSelectOption={setCategoryId}
                    />

                    <ControlPane
                        title="Number of Questions"
                        options={numberOfQuestionsOptions}
                        currentOption={amount}
                        handleSelectOption={setAmount}
                    />

                    <ControlPane
                        title="Difficulty"
                        options={questionDifficultyOptions}
                        currentOption={difficulty}
                        handleSelectOption={setDifficulty}
                    />

                    <ControlPane
                        title="Question Type"
                        options={questionTypeOptions}
                        currentOption={type}
                        handleSelectOption={setType}
                    />

                    <StartButton onClick={() => handleStartGame(true)}>
                        Start quiz
                    </StartButton>
                </div>
            }
        </Wrapper>
    )
}

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    min-height: 80vh;
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
    display: block;
    margin-top: 1em;
    margin-left: auto;
    margin-right: auto;
    padding: 1em 2.5em;
`

export default Start;