import React, {
  useState,
  useEffect,
  createContext,
  useCallback,
  useMemo,
  memo
} from 'react';

import he from 'he';

import { RATE_LIMIT_SECONDS } from '../../constants';
import { shuffle } from '../../utils';

export const TriviaQuestionsContext = createContext();

function TriviaQuestionsProvider({ isPlaying, children }) {
  const [triviaAPIEndpoint, setTriviaAPIEndpoint] = useState();
  const [questions, setQuestions] = useState([]);
  const [questionsStatus, setQuestionsStatus] = useState('idle');
  const [rateLimitSecondsLeft, setRateLimitSecondsLeft] = useState(null);

  const fetchAndSetQuestions = useCallback(async () => {
    if (!isPlaying) {
      return;
    }
    const data = await fetchQuestions(triviaAPIEndpoint);
    setQuestions(data?.results || []);
  }, [isPlaying, triviaAPIEndpoint]);
  
  useEffect(() => {
    fetchAndSetQuestions();
  }, [fetchAndSetQuestions])

  const fetchQuestions = async endpoint => {
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

  useEffect(() => {
    const firstPlaythrough = !isPlaying && !rateLimitSecondsLeft;

    if (firstPlaythrough) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      if (rateLimitSecondsLeft === null) {
        setRateLimitSecondsLeft(RATE_LIMIT_SECONDS);
      } else {
        if (rateLimitSecondsLeft > 0) {
          setRateLimitSecondsLeft(rateLimitSecondsLeft - 1);
        }
      }
    }, 1000)

    return () => window.clearTimeout(timeoutId);
  }, [isPlaying, rateLimitSecondsLeft])

  const resetRateLimitSecondsLeft = useCallback(() => {
    setRateLimitSecondsLeft(RATE_LIMIT_SECONDS);
  }, [])
  
  function formatQuestions(questions) {
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

  const formattedQuestions = useMemo(() => formatQuestions(questions), [questions]);

  const value = useMemo(() => (
    {
      triviaAPIEndpoint,
      setTriviaAPIEndpoint,
      questions: formattedQuestions,
      questionsAreLoading: questionsStatus === 'loading',
      fetchAndSetQuestions,
      rateLimitSecondsLeft,
      resetRateLimitSecondsLeft
    }
  ), [
      triviaAPIEndpoint,
      setTriviaAPIEndpoint,
      fetchAndSetQuestions,
      formattedQuestions, 
      questionsStatus, 
      rateLimitSecondsLeft, 
      resetRateLimitSecondsLeft
    ]
  )

  return (
    <TriviaQuestionsContext.Provider
      value={value}>
      {children}
    </TriviaQuestionsContext.Provider>
  );
}

export default memo(TriviaQuestionsProvider);
