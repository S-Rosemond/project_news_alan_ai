import React from 'react';
import { data } from '../NewsCards/NewsCards';

interface NewsCardProps {
  article: data;
  idx: number;
}

const NewsCard = ({ idx, article }: NewsCardProps) => {
  return <div>News Card</div>;
};

export default NewsCard;
