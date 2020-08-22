import React from 'react';
import { Grid, Grow } from '@material-ui/core';

import NewsCard from './../NewsCard/NewsCard';
import InfoCard from './../InfoCard/InfoCard';
import useStyles from './styles';

export interface data {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string | null;
  source: { id: string; name: string };
}

interface Props {
  articles: data[];
  activeArticle: number;
}

const NewsCards = ({ articles, activeArticle }: Props) => {
  const classes = useStyles();

  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.containerTwo}
          container
          alignItems='stretch'
          spacing={3}
        >
          <InfoCard />
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems='stretch'
        spacing={3}
      >
        {articles.map((article, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            <NewsCard
              idx={idx}
              article={article}
              activeArticle={activeArticle}
            />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
