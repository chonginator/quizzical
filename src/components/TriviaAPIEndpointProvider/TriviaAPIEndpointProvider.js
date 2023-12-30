import React, { createContext, useState, useMemo, memo } from 'react';

export const TriviaAPIEndpointContext = createContext();

function TriviaAPIEndpointProvider({ children }) {
  const [triviaAPIEndpoint, setTriviaAPIEndpoint] = useState();

  const value = useMemo(() => (
    { triviaAPIEndpoint, setTriviaAPIEndpoint }
  ), [triviaAPIEndpoint, setTriviaAPIEndpoint]);

  return (
    <TriviaAPIEndpointContext.Provider value={value}>
      {children}
    </TriviaAPIEndpointContext.Provider>
  );
}

export default memo(TriviaAPIEndpointProvider);
