export default function Disclaimer() {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 pt-20">
        <h1 className="text-3xl font-bold mb-4">Disclaimer</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          All information on Multigyan is published in good faith and for general informational purposes only.
          We do not make any warranties about the completeness, reliability, or accuracy of this information.
        </p>
        <p className="mb-4">
          Any action you take upon the information you find on this website is strictly at your own risk.
          Multigyan will not be liable for any losses or damages in connection with the use of our website.
        </p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    )
  }
  