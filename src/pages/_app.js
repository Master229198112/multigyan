import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/Multigyan_Logo_bg.ico" type="image/x-icon" />
      </Head>
      <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}
