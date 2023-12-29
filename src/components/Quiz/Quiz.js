import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import Confetti from 'react-confetti';

import { COLOURS } from '../../constants';
import useWindowScrollSize from '../../hooks/useWindowScrollSize';

import { TriviaQuestionsContext } from '../TriviaQuestionsProvider';
import Loader from '../Loader';
import Button from '../Button';
import ToggleGroup from '../ToggleGroup';
import AnswerToggle from '../AnswerToggle';

function Quiz({ setIsPlaying }) {
    const [isGameOver, setIsGameOver] = useState(false)
    const windowScrollSize = useWindowScrollSize()
    const {
        questions,
        questionsAreLoading,
        fetchAndSetQuestions
    } = useContext(TriviaQuestionsContext);
    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
        setUserAnswers(questions.map(question => ({ questionId: question.questionId, selectedAnswer: null })));
    }, [questions])

    const handleSelectAnswer = (questionId, answer) => {
        setUserAnswers(userAnswers.with(questionId, { questionId, selectedAnswer: answer }));
    }

    const isSelectedAnswer = (questionId, answer) => {
        return userAnswers[questionId]?.selectedAnswer === answer;
    }

    const handlePlayAgain = () => {
        setIsGameOver(false);
        fetchAndSetQuestions();
    }

    const score = userAnswers.reduce(
        (score, answer) => score + (answer.selectedAnswer === questions[answer.questionId].correctAnswer)
    , 0)

    return (
        <Wrapper>
            {/* Show confetti if the player gets 100%! */}
            {(isGameOver && (score === questions.length)) &&
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

            {/* Show a loader if the data is still loading */}
            {questionsAreLoading && <Loader loading={questionsAreLoading}/>}

            <>
                {!questionsAreLoading && questions.map(
                    ({
                        questionId,
                        question,
                        answers,
                        correctAnswer,
                    }) => {
                        return (
                            <ToggleGroup key={question} title={question}>
                                {answers.map(answer => (
                                    <AnswerToggle
                                        key={answer}
                                        isSelected={isSelectedAnswer(questionId, answer)}
                                        disabled={isGameOver}
                                        isGameOver={isGameOver}
                                        correctAnswer={correctAnswer}
                                        onClick={() => handleSelectAnswer(questionId, answer)}
                                        aria-pressed={isSelectedAnswer(questionId, answer)}
                                    >
                                        {answer}
                                    </AnswerToggle>
                                ))}
                            </ToggleGroup>
                        )
                    })
                }
            </>

            {!questionsAreLoading && (!isGameOver ?
                <QuizFooter>
                    <Button onClick={() => setIsGameOver(true)}>
                        Check answers
                    </Button>
                </QuizFooter>
                :
                <QuizFooter>
                    <Score>
                        You scored: {score}/{questions.length} correct answers
                    </Score>
                    <ButtonWrapper>
                        <Button onClick={handlePlayAgain}>Play again</Button>
                        <Button onClick={() => setIsPlaying(false)}>
                            Menu
                        </Button>
                    </ButtonWrapper>
                </QuizFooter>
            )
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    min-height: 95vh;
`

const QuizFooter = styled.div`
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

export default Quiz;