import type { NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

const WelcomePage: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome Page</h1>
        <Link href="/">Back</Link>
      </main>
    </div>
  );
};

export default WelcomePage;
