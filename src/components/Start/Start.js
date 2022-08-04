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
    // Cache categories data in localStorage
    // const { fetchMyAPI, data: categories, error, loading } = useFetch()
    const { fetchMyAPI, error, loading } = useFetch()
    // const { data: categories, error, loading } = useFetch(categoryUrl)
    const [categories, setCategories] = useState([])
    const [category, setCategoryId] = useState("")
    const [amount, setAmount] = useState(amountOptions[0].id)
    const [difficulty, setDifficulty] = useState(difficultyOptions[0].id)
    const [type, setType] = useState(typeOptions[0].id)

    // console.log(`current category: ${category}`)
    // console.log(`current amount: ${amount}`)
    // console.log(`current difficulty: ${difficulty}`)
    // console.log(`current type: ${type}`)
    
    useEffect(() => {
        (async () => {
            const data = await fetchMyAPI(categoryUrl)

            if (!error) {
                setCategories(
                    [{ id: "", label: "Any Category"}].concat( // "Any" option
                        data["trivia_categories"].map(
                            ({ id, name }) => ({ id, label: name })
                        )
                    )
                )
            }
        })()
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

    // useEffect(() => {
    //     if (categories) {
    //         setCategoryOptions(
    //             [{ id: "", label: "Any Category"}].concat(
    //                 categories['trivia_categories'].map(({ id, name }) => ({
    //                     id,
    //                     label: name
    //                 }))
    //             )
    //         )
    //     }
    // }, [categories])

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