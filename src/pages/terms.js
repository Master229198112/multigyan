import PageWrapper from '@/components/PageWrapper'
import Head from 'next/head'

export default function Terms() {
  return (
    <PageWrapper title="Terms of Service">
      <Head>
        <title>Multigyan – Explore the World</title>
        <meta name="description" content="Multigyan is your one-stop multi-niche blogging platform. Explore tech, fashion, crypto, finance, and more." />
      </Head>
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">
        These terms and conditions outline the rules and regulations for the use of the Multigyan website.
        By accessing this website, we assume you accept these terms. Do not continue to use Multigyan if you do not agree.
      </p>
      <p className="mb-4">
        You may not misuse the content, submit illegal material, or violate copyrights.
        We reserve the right to remove any content or restrict access at any time.
      </p>
      <p className="mb-4">
        We are not liable for any loss or damage arising from your use of the site.
        All blog content reflects the author&apos;s opinion and not professional advice.
      </p>
      <p>Last updated: 14th April 2025</p>
    </PageWrapper>
  )
}
