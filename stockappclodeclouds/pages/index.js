import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import Chip from "@material-ui/core/Chip";
import Router from 'next/router';
export default function Home() {
    const handleRedirect = () => {
        Router.push('/dashboard');
    };
  return (
    <div className={styles.container}>

      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <Link href="/dashboard" className="btn btn-primary">Dashboard</Link>
          <h1> click on below link to see stock Dashboard section  </h1>
          <Chip label="Redirect to Dashboard"  color="primary"  onDelete={handleRedirect} onClick={handleRedirect}>

          </Chip>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
