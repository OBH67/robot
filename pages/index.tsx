import Head from 'next/head'
import styles from '../styles/Home.module.css'
import  FieldY  from "./Classes/ClassY"
import  FieldX  from "./Classes/ClassX"
import  Field  from "./Classes/ClassField"
import  MineEMP  from "./Classes/ClassEmp"

enum Flags {
  LIMIT = 23,
}

// Enum de los posibles movimientos del robot en (X = FRONT AND BACK) y (X = UP AND DOWN)
enum SpeedLength {
  UP = 1,
  DOWN = -1,
  FRONT = 1,
  BACK = -1,
}

const speed = {
  x: {
    front: SpeedLength.FRONT,
    back: SpeedLength.BACK,
  },
  y: {
    up: SpeedLength.UP,
    down: SpeedLength.DOWN,
  },
};

const speedX = {
  x: {
    front: SpeedLength.FRONT,
    back: SpeedLength.BACK,
  },
};

const SpeedY = {
  y: {
    up: SpeedLength.UP,
    down: SpeedLength.DOWN,
  },
};

let mine_limit = Flags.LIMIT;

export default function Home() {

  const field_instance = new Field(mine_limit, 1000, speed);
  const result = field_instance.calculateArea();
  const area = result.toString();


  const field_instanceX = new FieldX(mine_limit, 1000, speedX);
  const resultX = field_instanceX.calculateArea();
  const nX = resultX.toString();


  const field_instanceY = new FieldY(mine_limit, 1000, SpeedY);
  const resultY = field_instanceY.calculateArea();
  const nY = resultY.toString();


  const emp_mine = new MineEMP(mine_limit, 1000, speed);
  const mineEMP = emp_mine.calculateArea();
  const nEMP = mineEMP.toString();


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
          <a className={styles.card}>
            <h3>Safe Area</h3>
            <p>
              How large is the area that the robot can access?. Answer: {area}
            </p>
          </a>
          <a className={styles.card}>
            <h3>EMP Mine Zone</h3>
            <p>EMP Mine area: {mineEMP}</p>
          </a>
          <a className={styles.card}>
            <h3>Safe Points (X,0)</h3>
            <p>Safe points on cordinate X: {nX}</p>
          </a>
          <a className={styles.card}>
            <h3>Safe Points (0,Y)</h3>
            <p>Safe points on cordinate Y: {nY}</p>
          </a>
        </div>
      </main>
    </div>
  )
}
