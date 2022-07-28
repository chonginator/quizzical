import React, { useState } from 'react';

import Start from '../Start';
import Quiz from '../Quiz';
import GlobalStyles from '../GlobalStyles/GlobalStyles';

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [apiUrl, setApiUrl] = useState("")

  // console.log(apiUrl)

  return (
    <>
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
    </>
  );
}

export default App;
