import React, { useContext } from 'react';
import styled from 'styled-components';

import { scrollToTop } from '../../utils';

import { TriviaCategoriesContext } from '../TriviaCategoriesProvider';
import { TriviaQuestionsContext } from '../TriviaQuestionsProvider';
import Button from '../Button';
import StartMenuControls from './StartMenuControls';

function StartMenu({ setIsPlaying }) {
    const { triviaCategoriesAreLoading } = useContext(TriviaCategoriesContext);
    const { rateLimitSecondsLeft, resetRateLimitSecondsLeft } = useContext(TriviaQuestionsContext)

    function handleStartQuiz() {
        setIsPlaying(true);
        resetRateLimitSecondsLeft();
        scrollToTop();
    }

    return (
        <Wrapper>
            <Title>Quizzical</Title>

            <Subtitle>Let's get quizzical</Subtitle>

            <StartMenuControls />

            <StartButton onClick={handleStartQuiz} disabled={triviaCategoriesAreLoading || rateLimitSecondsLeft}>
                Start quiz {rateLimitSecondsLeft > 0 && `(${rateLimitSecondsLeft})`}
            </StartButton>
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

    :disabled {
        background-color: var(--colour-button-disabled);
    }
`

export default StartMenu;