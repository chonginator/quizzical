import React, { useState } from 'react';

import TriviaCategoriesProvider from '../TriviaCategoriesProvider';
import TriviaQuestionsProvider from '../TriviaQuestionsProvider';

import AppWrapper from './AppWrapper';
import StartMenu from '../StartMenu';
import Trivia from '../Trivia';
import GlobalStyles from '../GlobalStyles/GlobalStyles';

function App() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <TriviaCategoriesProvider>
      <TriviaQuestionsProvider isPlaying={isPlaying}>
        <AppWrapper>
          {isPlaying ?
            <Trivia
              setIsPlaying={setIsPlaying}
            />
            :
            <StartMenu
              setIsPlaying={setIsPlaying}
            />
          }
          <GlobalStyles />
        </AppWrapper>
      </TriviaQuestionsProvider>
    </TriviaCategoriesProvider>
  );
}

export default App;