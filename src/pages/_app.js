import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}
