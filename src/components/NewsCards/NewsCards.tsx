import React, { Fragment } from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';

import NewsCard from './../NewsCard/NewsCard';

export interface data {
  [index: number]: {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string | null;
    source: { id: string; name: string };
  };
}

interface Props {
  articles: data[];
}

const NewsCards = ({ articles }: Props) => {
  return (
    <Fragment>
      <Grow in>
        <Grid container alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            {articles.map((article, idx) => (
              <NewsCard idx={idx} article={article} />
            ))}
          </Grid>
        </Grid>
      </Grow>
    </Fragment>
  );
};

export default NewsCards;
