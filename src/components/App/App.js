import React, { useState } from 'react';

import TriviaAPIEndpointProvider from '../TriviaAPIEndpointProvider';
import TriviaCategoriesProvider from '../TriviaCategoriesProvider';
import TriviaQuestionsProvider from '../TriviaQuestionsProvider';

import AppWrapper from './AppWrapper';
import StartMenu from '../StartMenu';
import Trivia from '../Trivia';
import GlobalStyles from '../GlobalStyles/GlobalStyles';


function App() {
  const [isPlaying, setIsPlaying] = useState(false)

  console.log('App render!');

  return (
    <TriviaAPIEndpointProvider>
      <TriviaCategoriesProvider>
        <AppWrapper>
          {isPlaying ?
            <TriviaQuestionsProvider>
              <Trivia
                setIsPlaying={setIsPlaying}
              />
            </TriviaQuestionsProvider>
            :
            <StartMenu
              setIsPlaying={setIsPlaying}
            />
          }

          <GlobalStyles />
        </AppWrapper>
      </TriviaCategoriesProvider>
    </TriviaAPIEndpointProvider>
  );
}



export default App;