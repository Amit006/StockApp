import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Router from 'next/router';

export default function Stock() {
    // Router.push('/dashboard');
    return (
        <div className={styles.container}>

            <Head>
                <title>Create Next App</title>
            </Head>

            <main className={styles.main}>
                <h1> Stock Page </h1>
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    )
}
