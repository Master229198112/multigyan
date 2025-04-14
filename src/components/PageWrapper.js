import Head from 'next/head'

export default function PageWrapper({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} | Multigyan – Explore the World</title>
        <meta name="description" content={`Read ${title} on Multigyan.`} />
        <meta property="og:title" content={`${title} | Multigyan`} />
        <meta property="og:description" content={`Explore ${title} and more at Multigyan.`} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen flex items-center justify-center px-4 animate-fade-in">
        <div className="w-full max-w-3xl p-6 border rounded shadow bg-black/50 dark:bg-white/5 backdrop-blur-md text-white">
          {children}
        </div>
      </div>
    </>
  )
}
