import PageWrapper from '@/components/PageWrapper'
import Head from 'next/head'



export default function About() {
  return (
    <PageWrapper title="About">
      <Head>
        <title>Multigyan – Explore the World</title>
        <meta name="description" content="Multigyan is your one-stop multi-niche blogging platform. Explore tech, fashion, crypto, finance, and more." />
      </Head>
      <h1 className="text-3xl font-bold mb-4">About Multigyan</h1>
      <p className="mb-4">
        Multigyan is a community-driven blogging platform focused on delivering quality content across diverse niches such as technology, science, education, lifestyle, and personal growth.
      </p>
      <p className="mb-4">
        Our mission is to empower creators by offering a space to publish ideas, share knowledge, and inspire others. We believe in the value of open expression and meaningful conversations.
      </p>
      <p>
        Whether you&apos;re here to read, write, or contribute, thank you for being part of our growing community. 💙
      </p>
    </PageWrapper>
  )
}
