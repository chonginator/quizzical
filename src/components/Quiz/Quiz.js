import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import he from 'he';

import { shuffle } from '../../utils';
import useFetch from '../../hooks/useFetch';
import ControlPane from '../ControlPane';
import Button from '../Button';

function Quiz({ handleStartGame, apiUrl }) {
    const { data, error, loading } = useFetch(apiUrl)
    const [questionData, setQuestionData] = useState([])
    const [score, setScore] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)

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
            {
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

            <div>
                {
                    !isGameOver ?
                        <div>
                            <SmallButton onClick={() => setIsGameOver(true)}>
                                Check answers
                            </SmallButton>
                        </div>
                        :
                        <div>
                            <Score>You scored: {score}/{questionData.length} correct answers</Score>
                            <div>
                                <SmallButton onClick={() => setIsGameOver(false)}>Play again</SmallButton>
                                <SmallButton onClick={() => handleStartGame(false)}>Menu</SmallButton>
                            </div>
                        </div>
                }
            </div>
        </main>
    )
}

const SmallButton = styled(Button)`
    font-size: 0.64rem;
`

const Score = styled.p`
    font-family: var(--font-family-secondary);
    font-size: 0.8rem;
    font-weight: var(--font-weight-bold);
`

export default Quiz;