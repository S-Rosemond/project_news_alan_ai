import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from '../components/NewsCards/NewsCards';

import useStyles from './styles';

interface Commands {
  command: string;
  articles?: any;
}

function App() {
  const alanKey = process.env.REACT_APP_ALAN;
  const classes = useStyles();

  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(() => -1);

  const tempFetch = async () => {
    // This was needed for styling purposes
    // Keeping for future reference: compare vs axios
    let result;

    if (newsArticles.length < 1) {
      result = await fetch(
        `https://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_NEWS}&sources=bbc-news`
      );
    }
    result = await result?.json();
    const { articles } = result;
    setNewsArticles(articles);
  };

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }: Commands) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prev) => prev + 1);
        }
      },
    });
    // tempFetch();
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src='https://alan.app/voice/images/previews/preview.jpg'
          alt='Alan ai logo'
          className={classes.alanLogo}
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
