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
                {answers.map(({ id: answerId, label: answer }) => {
                    return (
                        <AnswerToggle
                            key={answerId}
                            isSelected={currentAnswer === answerId}
                            disabled={isGameOver}
                            isGameOver={isGameOver}
                            correctAnswer={correctAnswer}
                            onClick={() => handleSelectAnswer(answerId)}
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