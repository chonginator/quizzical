import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import he from 'he';

import { shuffle } from '../../utils';
import useFetch from '../../hooks/useFetch';
import ControlPane from '../ControlPane';
import Button from '../Button';

function Quiz({ handleStartGame, apiUrl }) {
    const [isGameOver, setIsGameOver] = useState(false)
    const { data, error, loading } = useFetch(apiUrl, [isGameOver])
    const [questionData, setQuestionData] = useState([])
    const [score, setScore] = useState(0)

    // Format data for rendering
    useEffect(() => {
        if (data) {
            setQuestionData(data.results.map(
                ({ question, correct_answer, incorrect_answers }, index) => {
                    const correctAnswer = he.decode(correct_answer)
                    const incorrectAnswers = incorrect_answers.map(answer => he.decode(answer))
                    const answers = shuffle([correctAnswer, ...incorrectAnswers]).map(
                        answer => ({
                            id: answer,
                            label: answer
                        })
                    )
                    // console.log(incorrectAnswers)

                    return (
                        {
                            questionId: index,
                            question: he.decode(question),
                            answers: answers,
                            correctAnswer: correctAnswer,
                            selectedAnswer: null
                        }
                    )
                }
            ))
        }
    }, [data])

    // Keep score in sync with questionData
    useEffect(() => {
        setScore(
            questionData.reduce(
                (score, question) =>
                    score + (question.selectedAnswer === question.correctAnswer)
            , 0)
        )
    }, [questionData])
    
    return (
        <main>
            <div>{
                questionData.map(
                    ({ questionId, question, answers, selectedAnswer}) => {
                        return (
                            <ControlPane
                                key={question}
                                title={question}
                                options={answers}
                                currentOption={selectedAnswer}
                                
                                disabled={isGameOver}
                                handleSelectOption={answer => setQuestionData(
                                    prevQuestionData => prevQuestionData.map(
                                        question => question.questionId === questionId ?
                                            { ...question, selectedAnswer: answer }
                                            : question
                                    )
                                )}
                            />
                        )
                    })
                }
            </div>

            {
                !isGameOver ?
                    <QuizFooter>
                        <Button onClick={() => setIsGameOver(true)}>
                            Check answers
                        </Button>
                    </QuizFooter>
                    :
                    <QuizFooter>
                        <Score>You scored: {score}/{questionData.length} correct answers</Score>
                        <ButtonWrapper>
                            <Button onClick={() => setIsGameOver(false)}>Play again</Button>
                            <Button onClick={() => handleStartGame(false)}>Menu</Button>
                        </ButtonWrapper>
                    </QuizFooter>
            }
        </main>
    )
}

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