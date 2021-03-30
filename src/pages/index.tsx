import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
        <meta name="description" content=""/>
      </Head>

      <main>
        <section>
          <span> Hey, welcome</span>
        </section>

        <img src="/images/avatar.svg" alt="girl coding"/>
      </main>
    </>
  );
}
