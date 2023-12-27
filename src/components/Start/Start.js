import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';

import {
    TRIVIA_API_URL,
    TRIVIA_CATEGORIES_URL,
    ANY_CATEGORY
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
    const [category, setCategoryId] = useState("")
    const [amount, setAmount] = useState(numberOfQuestionsOptions[0].id)
    const [difficulty, setDifficulty] = useState(questionDifficultyOptions[0].id)
    const [type, setType] = useState(questionTypeOptions[0].id)
    
    const { data, error, isLoading } = useSWR(TRIVIA_CATEGORIES_URL, fetcher)

    async function fetcher(url) {
        const res = await fetch(url)
        const data = await res.json()

        if (!data) {
            throw new Error(`Unexpected data: ${data}.`);
        }

        return data;
    }

    const triviaCategories = data ? [ANY_CATEGORY, ...data.trivia_categories] : [];

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

    return (
        <Wrapper>
            <Title>Quizzical</Title>

            <Subtitle>Let's get quizzical</Subtitle>

            {isLoading && <Loader loading={isLoading}/>}

            {!isLoading &&
                <>
                    <ControlPane
                        title="Category"
                        options={triviaCategories}
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
                </>
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