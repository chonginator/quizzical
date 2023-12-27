import React, { useState } from 'react';
import styled from 'styled-components';

import TriviaCategoriesProvider from '../TriviaCategoriesProvider';
import Start from '../Start';
import Quiz from '../Quiz';
import GlobalStyles from '../GlobalStyles/GlobalStyles';

import yellowBlob from '../../yellow-blob.svg';
import blueBlob from '../../blue-blob.svg';

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [apiUrl, setApiUrl] = useState("")

  return (
    <TriviaCategoriesProvider>
      <Wrapper>
        <MaxWidthWrapper>
          {isPlaying ?
            <Quiz
              handleStartGame={setIsPlaying}
              apiUrl={apiUrl}
            />
            :
            <Start
              handleStartGame={setIsPlaying}
              setApiUrl={setApiUrl}
            />
          }

          <GlobalStyles />
        </MaxWidthWrapper>
      </Wrapper>
    </TriviaCategoriesProvider>
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