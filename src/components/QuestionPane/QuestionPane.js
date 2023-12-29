import React from 'react';

import PaneWrapper from '../PaneWrapper';
import PaneTitle from '../PaneTitle';
import ButtonRow from '../ButtonRow';
import AnswerToggle from '../AnswerToggle';

const QuestionPane = ({
    question,
    answers,
    currentAnswer,
    disabled,
    isGameOver,
    correctAnswer,
    handleSelectAnswer,
}) => {
    return (
        <PaneWrapper>
            <PaneTitle>{question}</PaneTitle>
            <ButtonRow>
                {answers.map((answer) => {
                    return (
                        <AnswerToggle
                            key={answer}
                            isSelected={currentAnswer === answer}
                            disabled={isGameOver}
                            isGameOver={isGameOver}
                            correctAnswer={correctAnswer}
                            onClick={() => handleSelectAnswer(answer)}
                        >
                            {answer}
                        </AnswerToggle>
                    )
                })}
            </ButtonRow>
        </PaneWrapper>
    )
}

export default QuestionPane;