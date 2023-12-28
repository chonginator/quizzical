import React, { useState, createContext } from 'react';

import { TRIVIA_API_BASE_URL } from '../../constants';

export const TriviaAPIContext = createContext();

function TriviaAPIProvider({ children }) {
  const [triviaAPIEndpoint, setTriviaAPIEndpoint] = useState(TRIVIA_API_BASE_URL);

  return (
    <TriviaAPIContext.Provider value={{ triviaAPIEndpoint, setTriviaAPIEndpoint }}>
      {children}
    </TriviaAPIContext.Provider>
  );
}

export default TriviaAPIProvider;
