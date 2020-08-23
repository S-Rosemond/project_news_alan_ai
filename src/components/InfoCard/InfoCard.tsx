import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';

import useStyles from './styles';

const InfoCard = () => {
  const infoCards = [
    { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
    {
      color: '#1565c0',
      title: 'News by Categories',
      info:
        'Business, Entertainment, General, Health, Science, Sports, Technology',
      text: 'Search by Technology',
    },
    {
      color: '#4527a0',
      title: 'News by Terms',
      info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...',
      text: "What's up with PlayStation 5",
    },
    {
      color: '#283593',
      title: 'News by Sources',
      info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...',
      text: 'Give me the news from CNN',
    },
  ];

  const classes = useStyles();
  const list = infoCards.map((infoCard, idx) => (
    <Grid
      key={idx}
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      className={classes.infoCard}
    >
      <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
        <Typography variant='h5'>{infoCard.title}</Typography>

        {infoCard.info ? (
          <Typography variant='h6'>
            <strong>{infoCard.title.split(' ')[2]}:</strong>
            <br />
            {infoCard.info}
          </Typography>
        ) : (
          <Typography variant='h6'>
            <strong>Current:</strong>
            <br />
            {new Date().toLocaleString()}
          </Typography>
        )}
        <Typography variant='h6'>
          Try saying:
          <br /> <i>{infoCard.text}</i>
        </Typography>
      </div>
    </Grid>
  ));

  return <Fragment>{list}</Fragment>;
};

export default InfoCard;
