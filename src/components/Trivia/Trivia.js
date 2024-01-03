import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import Confetti from 'react-confetti';

import {
    DEFAULT_NUMBER_OF_QUESTIONS,
    DEFAULT_NUMBER_OF_ANSWERS,
    COLOURS
} from '../../constants';
import { scrollToTop } from '../../utils';
import useWindowScrollSize from '../../hooks/useWindowScrollSize';

import { TriviaQuestionsContext } from '../TriviaQuestionsProvider';
import Button from '../Button';
import ToggleGroup, {
    ToggleGroupRow,
    ToggleGroupLoadingTitle,
    ToggleGroupTitle, 
    ToggleGroupLoadingItem,
    ToggleGroupAnswer
} from '../ToggleGroup';

function Trivia({ handleStopPlaying }) {
    const [isGameOver, setIsGameOver] = useState(false)
    const windowScrollSize = useWindowScrollSize()
    const {
        questions,
        questionsAreLoading,
        fetchAndSetQuestions,
        rateLimitSecondsLeft,
        resetRateLimitSecondsLeft
    } = useContext(TriviaQuestionsContext);
    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
        setUserAnswers(questions.map(() => null));
    }, [questions])

    const score = userAnswers.reduce(
        (score, answer, index) => score + (answer === questions[index]?.correctAnswer)
    , 0)

    const isWinner = isGameOver && score === questions.length;

    return (
        <Wrapper>
            {questionsAreLoading ? <TriviaQuestionsSkeleton /> : <TriviaQuestions />}

            {isGameOver ?
                <TriviaFooter>
                    <Score>
                        You scored: {score}/{questions.length} correct answers
                    </Score>
                    <ButtonWrapper>
                        <Button onClick={handlePlayAgain} disabled={rateLimitSecondsLeft}>
                            Play again {rateLimitSecondsLeft > 0 && `(${rateLimitSecondsLeft})`}</Button>
                        <Button onClick={handleStopPlaying}>
                            Menu
                        </Button>
                    </ButtonWrapper>
                </TriviaFooter>
                :
                <TriviaFooter>
                    <Button onClick={() => setIsGameOver(true)} disabled={questionsAreLoading}>
                        Check answers
                    </Button>
                </TriviaFooter>
            }

            {isWinner &&
                <Confetti
                    width={windowScrollSize.width}
                    height={windowScrollSize.height}
                    colors={[
                        COLOURS.button,
                        COLOURS.buttonHighlight,
                        COLOURS.lemon
                    ]}
                />
            }
        </Wrapper>
    )

    function TriviaQuestionsSkeleton() {
        return (
            new Array(DEFAULT_NUMBER_OF_QUESTIONS).fill().map((_, index) => (
                <ToggleGroup key={index}>
                    <ToggleGroupLoadingTitle />
                    <ToggleGroupRow>
                        {new Array(DEFAULT_NUMBER_OF_ANSWERS).fill().map((_, index) => (
                            <ToggleGroupLoadingItem key={index} />
                        ))}
                    </ToggleGroupRow>
                </ToggleGroup>
            ))
        )
    }

    function TriviaQuestions() {
        return (
            questions.map(({ question, answers, correctAnswer }, index) => {
                return (
                    <ToggleGroup key={question}>
                        <ToggleGroupTitle>{index + 1}. {question}</ToggleGroupTitle>
                        <ToggleGroupRow>
                            {answers.map(answer => (
                                <ToggleGroupAnswer
                                    key={answer}
                                    isSelected={isSelectedAnswer(index, answer)}
                                    disabled={isGameOver}
                                    isGameOver={isGameOver}
                                    correctAnswer={correctAnswer}
                                    onClick={() => handleSelectAnswer(index, answer)}
                                    aria-pressed={isSelectedAnswer(index, answer)}
                                >
                                    {answer}
                                </ToggleGroupAnswer>
                            ))}
                        </ToggleGroupRow>
                    </ToggleGroup>
                )
            })
        )
    }

    function handleSelectAnswer(index, answer) {
        setUserAnswers(userAnswers.with(index, answer));
    }

    function isSelectedAnswer(index, answer) {
        return userAnswers[index] === answer;
    }

    function handlePlayAgain() {
        setIsGameOver(false);
        fetchAndSetQuestions();
        resetRateLimitSecondsLeft();
        scrollToTop();
    }
}

const Wrapper = styled.div`
    min-height: 95vh;
`

const TriviaFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.9em;
    margin-top: 1.2em;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.9em;
`

const Score = styled.p`
    font-family: var(--font-family-secondary);
    font-weight: var(--font-weight-bold);
`

export default Trivia;