import React, { useState } from 'react';

import Start from '../Start';
import Quiz from '../Quiz';

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [apiUrl, setApiUrl] = useState("")

  return (
    isPlaying ? <Quiz />
    :
    <Start
      handleStartGame={setIsPlaying}
      setApiUrl={setApiUrl}
    />
  );
}

export default App;
