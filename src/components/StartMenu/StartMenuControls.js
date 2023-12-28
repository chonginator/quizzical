import React, { useState, useEffect, useContext } from 'react';

import {
    TRIVIA_API_BASE_URL,
    DEFAULT_NUMBER_OF_CATEGORIES,
    DEFAULT_NUMBER_OF_QUESTIONS,
    DEFAULT_NUMBER_OF_DIFFICULTIES,
    DEFAULT_NUMBER_OF_QUESTION_TYPES
} from '../../constants';
import { getRandomNumBetweenMinAndMax } from '../../utils';
import {
    numberOfQuestionsOptions,
    questionDifficultyOptions,
    questionTypeOptions
} from './StartMenu.helpers';

import { TriviaAPIContext } from '../TriviaAPIProvider';
import { TriviaCategoriesContext } from '../TriviaCategoriesProvider';
import ToggleGroup from '../ToggleGroup';
import ToggleButton from '../ToggleButton';
import LoadingToggleButton from '../LoadingToggleButton';

function StartMenuControls() {
  const [categoryId, setCategoryId] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(numberOfQuestionsOptions[0].id);
  const [questionDifficulty, setQuestionDifficulty] = useState(questionDifficultyOptions[0].id);
  const [questionType, setQuestionType] = useState(questionTypeOptions[0].id);

  const { setTriviaAPIEndpoint } = useContext(TriviaAPIContext);
  const { triviaCategories, triviaCategoriesAreLoading } = useContext(TriviaCategoriesContext);

  useEffect(() => {
        setTriviaAPIEndpoint(
            TRIVIA_API_BASE_URL +
            new URLSearchParams({
                categoryId,
                numberOfQuestions,
                questionDifficulty,
                questionType
            }).toString()
        )
    },
    [
        setTriviaAPIEndpoint,
        categoryId,
        numberOfQuestions,
        questionDifficulty,
        questionType,
    ])

  return (
    triviaCategoriesAreLoading ?
      <>
        <ToggleGroup title="Category">
          {new Array(DEFAULT_NUMBER_OF_CATEGORIES).fill().map((_, index) => (
              <LoadingToggleButton key={index} style={{ 'minWidth': `${getRandomNumBetweenMinAndMax(40, 250)}px` }} />
          ))}
        </ToggleGroup>

        <ToggleGroup title="Number of Questions">
          {new Array(DEFAULT_NUMBER_OF_QUESTIONS).fill().map((_, index) => (
              <LoadingToggleButton key={index} style={{ 'minWidth': '40px'}} />
          ))}
        </ToggleGroup>

        <ToggleGroup title="Difficulty">
            {new Array(DEFAULT_NUMBER_OF_DIFFICULTIES).fill().map((_, index) => (
                <LoadingToggleButton key={index} />
            ))}
        </ToggleGroup>

        <ToggleGroup title="Question Type">
          {new Array(DEFAULT_NUMBER_OF_QUESTION_TYPES).fill().map((_, index) => (
              <LoadingToggleButton key={index} />
          ))}
        </ToggleGroup>
      </>
    :
      <>
        <ToggleGroup
          title="Category"
        >
          {triviaCategories.map(({ id, name }) => (
            <ToggleButton
                key={id}
                isSelected={categoryId === id}
                onClick={() => setCategoryId(id)}
            >
                {name}
            </ToggleButton>
          ))}
        </ToggleGroup>

        <ToggleGroup title="Number of Questions">
          {numberOfQuestionsOptions.map(({ id, name }) => (
              <ToggleButton
                  key={id}
                  isSelected={numberOfQuestions === id}
                  onClick={() => setNumberOfQuestions(id)}
              >
                  {name}
              </ToggleButton>
          ))}
        </ToggleGroup>

        <ToggleGroup
            title="Difficulty"
        >
            {questionDifficultyOptions.map(({ id, name }) => (
                <ToggleButton
                    key={id}
                    isSelected={questionDifficulty === id}
                    onClick={() => setQuestionDifficulty(id)}
                >
                    {name}
                </ToggleButton>
            ))}
        </ToggleGroup>

        <ToggleGroup
            title="Question Type"
        >
            {questionTypeOptions.map(({ id, name }) => (
                <ToggleButton
                    key={id}
                    isSelected={questionType === id}
                    onClick={() => setQuestionType(id)}
                >
                    {name}
                </ToggleButton>
            ))}

        </ToggleGroup>
      </>
  )
  
}

export default StartMenuControls;
