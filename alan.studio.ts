// Adding Alan ai studio code here in case it gets deleted
// sm changes from tutorial, I want to preserve

const apiKey = 'fill in key';
let savedArticles = [];

// Use this sample to create your own voice commands
intent(
  'What does this app do?',
  'What can I do here?',
  reply('This is a news Project')
);

// News by Source
intent('Give me the news from $(source* (.*))', (p) => {
  let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;

  if (p.source.value) {
    if (p.source.value.split(' ').length > 1) {
      NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value
        .toLowerCase()
        .split(' ')
        .join('-')}`;
    } else {
      NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase()}`;
    }
  }

  api.request(NEWS_API_URL, (error, response, body) => {
    const { articles } = JSON.parse(body);

    if (!articles.length) {
      p.play('Sorry, please try searching news from a different source');
      return;
    }

    savedArticles = articles;

    p.play({ command: 'newHeadlines', articles });
    p.play(`Here are the (latest | recent) ${p.source.value} news`);
    p.play(`Would you like me to read the titles`);
    p.then(confirmation);
  });
});

// News by Term
intent("what's up with $(term* (.*))", (p) => {
  let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${apiKey}`;

  if (p.term.value) {
    NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value.toLowerCase()}`;
  }

  api.request(NEWS_API_URL, (error, response, body) => {
    const { articles } = JSON.parse(body);
    console.log(articles);
    if (articles.length < 1) {
      p.play(
        'Sorry, please try searching for (a different term | something else)'
      );
      return;
    }

    savedArticles = articles;

    p.play({ command: 'newHeadlines', articles });
    p.play(`Here are the (latest | recent) articles on ${p.term.value}`);
    p.play(`Would you like me to read the titles`);
    p.then(confirmation);
  });
});

// News by Categories
intent(
  'search by $(categories business|entertainment|general| health| science| sports| technology)',
  (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=us`;

    if (p.categories.value) {
      NEWS_API_URL = `${NEWS_API_URL}&category=${p.categories.value.toLowerCase()}`;
    }

    api.request(NEWS_API_URL, (error, response, body) => {
      const { articles } = JSON.parse(body);

      if (articles.length < 1) {
        p.play('Sorry, please try searching for a different category');
        return;
      }

      savedArticles = articles;

      p.play({ command: 'newHeadlines', articles });
      p.play(`Here are articles related to ${p.categories.value}`);
      p.play(`Would you like me to read the titles`);
      p.then(confirmation);
    });
  }
);

// Latest news
intent(
  'Give me the $(TOPIC latest news | most recent news| top headlines)',
  (p) => {
    const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=us`;

    api.request(NEWS_API_URL, (error, response, body) => {
      const { articles } = JSON.parse(body);

      if (articles.length < 1) {
        p.play('Sorry, please try searching for a different category');
        return;
      }

      savedArticles = articles;

      p.play({ command: 'newHeadlines', articles });
      p.play(`Here are the ${p.TOPIC.value}`);
      p.play(`Would you like me to read the ${p.TOPIC.value}`);
      p.then(confirmation);
    });
  }
);

const confirmation = context(() => {
  intent('Yes', async (p) => {
    for (let article of savedArticles) {
      p.play({ command: 'highlight', article: article });
      p.play(`${article.title}`);
    }
  });

  intent('No', (p) => {
    p.play('(okeydoke | Ok, sounds good to me)');
  });
});

intent('open (the|) ( article|) (number|) $(number* (.*))', (p) => {
  if (p.number.value) {
    p.play({
      command: 'open',
      number: p.number.value,
      articles: savedArticles,
    });
  }
});

intent('go back', (p) => {
  p.play('Sure, going back');
  p.play({ command: 'newHeadlines', articles: [] });
});
