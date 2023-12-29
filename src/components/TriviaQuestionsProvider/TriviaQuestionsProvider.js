import React, { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';

import he from 'he';

import { shuffle } from '../../utils';

import { TriviaAPIEndpointContext } from '../TriviaAPIEndpointProvider';

export const TriviaQuestionsContext = createContext();

function TriviaQuestionsProvider({ children }) {
  const { triviaAPIEndpoint } = useContext(TriviaAPIEndpointContext);
  const [questions, setQuestions] = useState([]);
  const [questionsStatus, setQuestionsStatus] = useState('idle');

  const fetchAndSetQuestions = useCallback(async () => {
    const data = await fetchTriviaQuestions(triviaAPIEndpoint);
    setQuestions(data.results);
  }, [triviaAPIEndpoint]);

  useEffect(() => {
    fetchAndSetQuestions();
  }, [fetchAndSetQuestions])
  

  const fetchTriviaQuestions = async endpoint => {
    setQuestionsStatus('loading');
    const res = await fetch(endpoint);
    const data = await res.json();

    if (data.response_code === 0) {
      setQuestionsStatus('success');
      return data;
    } else {
      setQuestionsStatus('error');
    }
  }

  console.log('TriviaQuestionsProvider render!');
    
  function formatTriviaQuestions(questions) {
    return questions.map(
      ({ question, correct_answer, incorrect_answers }, index) => {
          const correctAnswer = he.decode(correct_answer)
          const incorrectAnswers = incorrect_answers.map(answer => he.decode(answer))
          const answers = shuffle([correctAnswer, ...incorrectAnswers])

          return (
              {
                  questionId: index,
                  question: he.decode(question),
                  answers,
                  correctAnswer: correctAnswer,
              }
          )
      }
    )
  }

  const value = useMemo(() => (
    {
      questions: formatTriviaQuestions(questions),
      questionsAreLoading: questionsStatus === 'loading',
      fetchAndSetQuestions
    }
  ), [fetchAndSetQuestions, questions, questionsStatus])

  return (
    <TriviaQuestionsContext.Provider
      value={value}>
      {children}
    </TriviaQuestionsContext.Provider>
  );
}

export default TriviaQuestionsProvider;
