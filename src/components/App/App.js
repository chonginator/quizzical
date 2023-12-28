import React, { useState } from 'react';
import styled from 'styled-components';

import TriviaAPIProvider from '../TriviaAPIProvider/TriviaAPIProvider.js';
import TriviaCategoriesProvider from '../TriviaCategoriesProvider/index.js';
import StartMenu from '../StartMenu';
import Quiz from '../Quiz';
import GlobalStyles from '../GlobalStyles/GlobalStyles';

import yellowBlob from '../../yellow-blob.svg';
import blueBlob from '../../blue-blob.svg';

function App() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <TriviaAPIProvider>
      <TriviaCategoriesProvider>
        <Wrapper>
          <MaxWidthWrapper>
            {isPlaying ?
              <Quiz
                setIsPlaying={setIsPlaying}
              />
              :
              <StartMenu
                setIsPlaying={setIsPlaying}
              />
            }

            <GlobalStyles />
          </MaxWidthWrapper>
        </Wrapper>
      </TriviaCategoriesProvider>
    </TriviaAPIProvider>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  background-image:
    url(${yellowBlob}),
    url(${blueBlob});
  background-repeat: no-repeat;
  background-position:
    top right,
    bottom left;
`

const MaxWidthWrapper = styled.div`
  max-width: 840px;
  margin: 0 auto;
  padding: 1em;
`

export default App;