import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import he from 'he';
import Confetti from 'react-confetti';

import { COLOURS } from '../../constants';
import { shuffle } from '../../utils';
import useFetch from '../../hooks/useFetch';
import useWindowScrollSize from '../../hooks/useWindowScrollSize';
import QuestionPane from '../QuestionPane';
import Button from '../Button';

function Quiz({ handleStartGame, apiUrl }) {
    const [isGameOver, setIsGameOver] = useState(false)
    const { fetchMyAPI, data, error, loading } = useFetch()
    const [quizData, setQuizData] = useState([])
    const windowScrollSize = useWindowScrollSize()

    useEffect(() => {
        fetchMyAPI(apiUrl)
    }, [apiUrl])
    
    // Format data for rendering
    useEffect(() => {
        if (data) {
            setQuizData(data.results.map(
                ({ question, correct_answer, incorrect_answers }, index) => {
                    const correctAnswer = he.decode(correct_answer)
                    const incorrectAnswers = incorrect_answers.map(answer => he.decode(answer))
                    const answers = shuffle([correctAnswer, ...incorrectAnswers]).map(
                        answer => ({
                            id: answer,
                            label: answer
                        })
                    )

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
    console.log(quizData)

    return (
        <main>
            {/* Show confetti if the player gets 100%! */}
            {(isGameOver && (score === quizData.length)) &&
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
            <div>
                {!loading && quizData.map(
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

            {!loading && (!isGameOver ?
                <QuizFooter>
                    <Button onClick={() => setIsGameOver(true)}>
                        Check answers
                    </Button>
                </QuizFooter>
                :
                <QuizFooter>
                    <Score>
                        You scored: {score}/{quizData.length} correct answers
                    </Score>
                    <ButtonWrapper>
                        <Button onClick={handlePlayAgain}>Play again</Button>
                        <Button onClick={() => handleStartGame(false)}>
                            Menu
                        </Button>
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