import React, { FC } from 'react';
import styles from './styles.module.css';

interface PageTitleProps {
  title: string;
}

const PageTitle: FC<PageTitleProps> = ({ title }) => {
  return (
    <h1 className={styles.title}>{title}</h1>
  );
};

export default PageTitle;
