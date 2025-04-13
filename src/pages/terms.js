export default function Terms() {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 pt-20">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
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
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    )
  }
  