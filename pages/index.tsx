import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <div className={styles.grid}>
          <a className={styles.card}>
            <h3>Safe Area</h3>
            <p>
              How large is the area that the robot can access?. Answer: 
            </p>
          </a>

          <a className={styles.card}>
            <h3>EMP Mine Zone</h3>
            <p>EMP Mine area: }</p>
          </a>

          <a className={styles.card}>
            <h3>Safe Points (X,0)</h3>
            <p>Safe points on cordinate X: </p>
          </a>

          <a className={styles.card}>
            <h3>Safe Points (0,Y)</h3>
            <p>Safe points on cordinate Y: </p>
          </a>
        </div>
      </main>
    </div>
  )
}
