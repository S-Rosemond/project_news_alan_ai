import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from '../components/NewsCards/NewsCards';

interface Commands {
  command: string;
  articles?: any;
}

function App() {
  const alanKey = process.env.REACT_APP_ALAN;

  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }: Commands) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
        }
      },
    });
  }, []);

  return (
    <div>
      <NewsCards articles={newsArticles} />
    </div>
  );
}

export default App;
