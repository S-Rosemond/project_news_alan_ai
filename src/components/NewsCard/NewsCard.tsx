import React, { useState, useEffect, createRef, useRef } from 'react';
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';
import useStyles from './styles';

import { data } from '../NewsCards/NewsCards';

interface NewsCardProps {
  article: data;
  idx: number;
  activeArticle: number;
}

const NewsCard = ({ idx, article, activeArticle }: NewsCardProps) => {
  const placeholder =
    'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png';

  const { title, description, url, urlToImage, publishedAt, source } = article;

  const classes = useStyles();

  const [elRefs, setElRefs] = useState<any>([]);

  const scrollToRef = (ref: React.RefObject<any>) => {
    window.scroll(0, ref.current.offsetTop - 50);
  };

  useEffect(() => {
    setElRefs((refs: any) =>
      Array(20)
        .fill(null)
        .map((_, j) => refs[j] || createRef())
    );
  }, [idx]);

  useEffect(() => {
    if (idx === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [idx, activeArticle, elRefs]);

  return (
    <Card
      ref={elRefs[idx]}
      className={classNames(
        classes.card,
        activeArticle === idx ? classes.activeCard : null
      )}
    >
      <CardActionArea href={url} target='_blank'>
        <CardMedia
          className={classes.media}
          image={urlToImage || placeholder}
        />
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary' component='h2'>
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='h2'>
            {source.name}
          </Typography>
        </div>
        <Typography gutterBottom variant='h5' className={classes.title}>
          {title}
        </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary'>
          Learn More
        </Button>
        <Typography variant='h5' color='textSecondary'>
          {idx + 1}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
