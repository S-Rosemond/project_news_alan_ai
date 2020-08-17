import React, { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

interface Commands {
  command: string;
  data?: any;
}

function App() {
  const alanKey = process.env.REACT_APP_ALAN;

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, data }: Commands) => {
        if (command === 'newHeadlines') {
          console.log(data);
        }
      },
    });
  }, []);

  return (
    <div>
      <h1>Alan Ai News Application</h1>
    </div>
  );
}

export default App;
