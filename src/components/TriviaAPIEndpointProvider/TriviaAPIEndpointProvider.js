import React, { createContext, useState, useMemo } from 'react';

import { TRIVIA_API_BASE_URL } from '../../constants';

export const TriviaAPIEndpointContext = createContext();

function TriviaAPIEndpointProvider({ children }) {
  const [triviaAPIEndpoint, setTriviaAPIEndpoint] = useState(TRIVIA_API_BASE_URL);

  console.log('TriviaAPIEndpointProvider render!')

  const value = useMemo(() => (
    { triviaAPIEndpoint, setTriviaAPIEndpoint }
  ), [triviaAPIEndpoint, setTriviaAPIEndpoint]);

  return (
    <TriviaAPIEndpointContext.Provider value={value}>
      {children}
    </TriviaAPIEndpointContext.Provider>
  );
}

export default TriviaAPIEndpointProvider;
