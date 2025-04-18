import PageWrapper from '@/components/PageWrapper'
import Head from 'next/head'

export default function Disclaimer() {
  return (
    <PageWrapper title="Disclaimer">
      <Head>
        <title>Multigyan – Explore the World</title>
        <meta name="description" content="Multigyan is your one-stop multi-niche blogging platform. Explore tech, fashion, crypto, finance, and more." />
      </Head>
      <h1 className="text-3xl font-bold mb-4">Disclaimer</h1>
      <p className="mb-4">
        All information on Multigyan is published in good faith and for general informational purposes only.
        We do not make any warranties about the completeness, reliability, or accuracy of this information.
      </p>
      <p className="mb-4">
        Any action you take upon the information you find on this website is strictly at your own risk.
        Multigyan will not be liable for any losses or damages in connection with the use of our website.
      </p>
      <p>Last updated: 14th April 2025</p>
    </PageWrapper>
  )
}
