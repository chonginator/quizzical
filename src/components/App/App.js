import React, { useState } from 'react';

import TriviaCategoriesProvider from '../TriviaCategoriesProvider';
import TriviaQuestionsProvider from '../TriviaQuestionsProvider';

import AppWrapper from './AppWrapper';
import StartMenu from '../StartMenu';
import Trivia from '../Trivia';
import GlobalStyles from '../GlobalStyles/GlobalStyles';

function App() {
  const [isPlaying, setIsPlaying] = useState(false)

  function handleStartPlaying() {
    setIsPlaying(true);
  }

  function handleStopPlaying() {
    setIsPlaying(false);
  }

  return (
    <TriviaCategoriesProvider>
      <TriviaQuestionsProvider isPlaying={isPlaying}>
        <AppWrapper>
          {isPlaying ?
            <Trivia
              handleStopPlaying={handleStopPlaying}
            />
            :
            <StartMenu
              handleStartPlaying={handleStartPlaying}
            />
          }
          <GlobalStyles />
        </AppWrapper>
      </TriviaQuestionsProvider>
    </TriviaCategoriesProvider>
  );
}

export default App;