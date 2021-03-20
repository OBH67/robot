import Head from "next/head";
import styles from "../styles/Home.module.css";
import ClassX from "./Classes/ClassX";
import ClassY from "./Classes/ClassY";
import ClassField from "./Classes/ClassField";
import ClassMine from "./Classes/ClassMine";

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
        <p className={styles.description}>Robot EMP Mine Problem</p>
        <div className={styles.grid}>
          <ClassField />
          <ClassMine />
          <ClassX />
          <ClassY />
         </div>
      </main>
    </div>
  );
}
