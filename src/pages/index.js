import Head from "next/head";
import IGLogin from "../components/IGLogin";
import IGPhotos from "../components/IGPhotos";
import styles from "../../styles/Home.module.css";

import { useIGAuthConsumer } from "../providers/IGAuthProvider";

export default function Home() {
  const { access_token, user_id } = useIGAuthConsumer();

  if (user_id && access_token) {
    return <IGPhotos />;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <IGLogin />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.maiconsilva.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by @MaiconSilva
        </a>
      </footer>
    </div>
  );
}
