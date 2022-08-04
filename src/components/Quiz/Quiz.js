import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import he from 'he';

import { shuffle } from '../../utils';
import useFetch from '../../hooks/useFetch';
import QuestionPane from '../QuestionPane';
import Button from '../Button';

function Quiz({ handleStartGame, apiUrl }) {
    const [isGameOver, setIsGameOver] = useState(false)
    // const { data, error, loading } = useFetch(apiUrl)
    const { fetchMyAPI, error, loading } = useFetch()
    const [quizData, setQuizData] = useState([])
    // const [score, setScore] = useState(0)

    useEffect(() => {
        (async () => {
            const data = await fetchMyAPI(apiUrl)

            if (!error) {
                setQuizData(
                    data.results.map(({
                            question,
                            correct_answer,
                            incorrect_answers
                        }, index) => {
                            const correctAnswer = he.decode(correct_answer)
                            const incorrectAnswers = incorrect_answers.map(
                                answer => he.decode(answer)
                            )
                            const answers = shuffle(
                                [correctAnswer, ...incorrectAnswers]
                            ).map(answer => ({id: answer, label: answer}))

                            return ({
                                questionId: index,
                                question: he.decode(question),
                                answers: answers,
                                correctAnswer: correctAnswer,
                                selectedAnswer: null
                            })
                        }
                    )
                )
            }
        })()
    }, [])
    
    // Format data for rendering

    // useEffect(() => {
    //     if (data) {
    //         setQuizData(data.results.map(
    //             ({ question, correct_answer, incorrect_answers }, index) => {
    //                 const correctAnswer = he.decode(correct_answer)
    //                 const incorrectAnswers = incorrect_answers.map(answer => he.decode(answer))
    //                 const answers = shuffle([correctAnswer, ...incorrectAnswers]).map(
    //                     answer => ({
    //                         id: answer,
    //                         label: answer
    //                     })
    //                 )

    //                 return (
    //                     {
    //                         questionId: index,
    //                         question: he.decode(question),
    //                         answers: answers,
    //                         correctAnswer: correctAnswer,
    //                         selectedAnswer: null
    //                     }
    //                 )
    //             }
    //         ))
    //     }
    // }, [data])

    // Keep score in sync with quizData

    // useEffect(() => {
    //     setScore(
    //         quizData.reduce(
    //             (score, question) =>
    //                 score + (question.selectedAnswer === question.correctAnswer)
    //         , 0)
    //     )
    // }, [quizData])

    
    const handlePlayAgain = () => {
        setIsGameOver(false)
        fetchMyAPI(apiUrl)
    }

    
    let score
    if (quizData) {
        score = quizData.reduce(
            (score, question) =>
                score + (question.selectedAnswer === question.correctAnswer)
        , 0)
    }

    return (
        <main>
            <div>{
                quizData.map(
                    ({
                        questionId,
                        question,
                        answers,
                        correctAnswer,
                        selectedAnswer
                    }) => {
                        return (
                            <QuestionPane
                                key={question}
                                question={question}
                                answers={answers}
                                currentAnswer={selectedAnswer}
                                isGameOver={isGameOver}
                                correctAnswer={correctAnswer}
                                handleSelectAnswer={answer => setQuizData(
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
                !loading && (!isGameOver ?
                    <QuizFooter>
                        <Button onClick={() => setIsGameOver(true)}>
                            Check answers
                        </Button>
                    </QuizFooter>
                    :
                    <QuizFooter>
                        <Score>You scored: {score}/{quizData.length} correct answers</Score>
                        <ButtonWrapper>
                            <Button onClick={handlePlayAgain}>Play again</Button>
                            <Button onClick={() => handleStartGame(false)}>Menu</Button>
                        </ButtonWrapper>
                    </QuizFooter>
                )
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