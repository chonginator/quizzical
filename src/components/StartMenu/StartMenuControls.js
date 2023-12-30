import React, { useState, useEffect, useContext, memo } from 'react';

import {
    TRIVIA_API_BASE_URL,
    DEFAULT_NUMBER_OF_CATEGORIES,
    DEFAULT_NUMBER_OF_QUESTION_AMOUNTS,
    DEFAULT_NUMBER_OF_DIFFICULTIES,
    DEFAULT_NUMBER_OF_QUESTION_TYPES
} from '../../constants';
import { getRandomNumBetweenMinAndMax } from '../../utils';
import {
    numberOfQuestionsOptions,
    questionDifficultyOptions,
    questionTypeOptions
} from './StartMenu.helpers';

import { TriviaQuestionsContext } from '../TriviaQuestionsProvider';
import { TriviaCategoriesContext } from '../TriviaCategoriesProvider';
import ToggleGroup, {
    ToggleGroupRow,
    ToggleGroupTitle,
    ToggleGroupItem,
    ToggleGroupLoadingItem
} from '../ToggleGroup';

function StartMenuControls() {
  const [categoryId, setCategoryId] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(numberOfQuestionsOptions[0].id);
  const [questionDifficulty, setQuestionDifficulty] = useState(questionDifficultyOptions[0].id);
  const [questionType, setQuestionType] = useState(questionTypeOptions[0].id);

  const { triviaCategories, triviaCategoriesAreLoading } = useContext(TriviaCategoriesContext);
  const { setTriviaAPIEndpoint } = useContext(TriviaQuestionsContext);

  useEffect(() => {
        setTriviaAPIEndpoint(
            TRIVIA_API_BASE_URL +
            new URLSearchParams({
                category: categoryId,
                amount: numberOfQuestions,
                difficulty: questionDifficulty,
                type: questionType
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
      <StartMenuControlsSkeleton />
    :
      <StartMenuControlsLoaded />
  )
  
  function StartMenuControlsSkeleton() {
    return (
        <>
            <ToggleGroup>
                <ToggleGroupTitle>Category</ToggleGroupTitle>
                <ToggleGroupRow>
                    {new Array(DEFAULT_NUMBER_OF_CATEGORIES).fill().map((_, index) => (
                    <ToggleGroupLoadingItem key={index} style={{ 'minWidth': `${getRandomNumBetweenMinAndMax(40, 250)}px` }} />
                    ))}
                </ToggleGroupRow>
            </ToggleGroup>

            <ToggleGroup>
                <ToggleGroupTitle>Number of Questions</ToggleGroupTitle>
                <ToggleGroupRow>
                    {new Array(DEFAULT_NUMBER_OF_QUESTION_AMOUNTS).fill().map((_, index) => (
                    <ToggleGroupLoadingItem key={index} style={{ 'minWidth': '40px'}} />
                    ))}
                </ToggleGroupRow>
            </ToggleGroup>

            <ToggleGroup>
                <ToggleGroupTitle>Difficulty</ToggleGroupTitle>
                <ToggleGroupRow>
                    {new Array(DEFAULT_NUMBER_OF_DIFFICULTIES).fill().map((_, index) => (
                        <ToggleGroupLoadingItem key={index} />
                    ))}
                </ToggleGroupRow>
            </ToggleGroup>

            <ToggleGroup>
                <ToggleGroupTitle>Question Type</ToggleGroupTitle>
                <ToggleGroupRow>
                    {new Array(DEFAULT_NUMBER_OF_QUESTION_TYPES).fill().map((_, index) => (
                        <ToggleGroupLoadingItem key={index} />
                    ))}
                </ToggleGroupRow>
            </ToggleGroup>
        </>
    )
  }

  function StartMenuControlsLoaded() {
    return (
        <>
            <ToggleGroup>
                <ToggleGroupTitle>Category</ToggleGroupTitle>
                <ToggleGroupRow>
                    {triviaCategories.map(({ id, name }) => (
                        <ToggleGroupItem
                            key={id}
                            isSelected={categoryId === id}
                            onClick={() => setCategoryId(id)}
                        >
                            {name}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroupRow>
            </ToggleGroup>

            <ToggleGroup>
                <ToggleGroupTitle>Number of Questions</ToggleGroupTitle>
                <ToggleGroupRow>
                    {numberOfQuestionsOptions.map(({ id, name }) => (
                        <ToggleGroupItem
                            key={id}
                            isSelected={numberOfQuestions === id}
                            onClick={() => setNumberOfQuestions(id)}
                        >
                            {name}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroupRow>
            </ToggleGroup>

            <ToggleGroup>
                <ToggleGroupTitle>Difficulty</ToggleGroupTitle>
                <ToggleGroupRow>
                    {questionDifficultyOptions.map(({ id, name }) => (
                        <ToggleGroupItem
                            key={id}
                            isSelected={questionDifficulty === id}
                            onClick={() => setQuestionDifficulty(id)}
                        >
                            {name}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroupRow>
            </ToggleGroup>

            <ToggleGroup>
                <ToggleGroupTitle>Question Type</ToggleGroupTitle>
                <ToggleGroupRow>
                    {questionTypeOptions.map(({ id, name }) => (
                        <ToggleGroupItem
                            key={id}
                            isSelected={questionType === id}
                            onClick={() => setQuestionType(id)}
                        >
                            {name}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroupRow>
            </ToggleGroup>
        </>
    )
  }
}

export default memo(StartMenuControls);
