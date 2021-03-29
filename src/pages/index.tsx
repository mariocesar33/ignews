import Head from 'next/head';

import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio | ig.news</title>

        <meta name="description" content=""/>
      </Head>
      <h1 className={styles.title}>
        Hello <span>word</span>
      </h1>
    </>
  );
}
