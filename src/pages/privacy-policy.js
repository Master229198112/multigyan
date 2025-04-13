export default function PrivacyPolicy() {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 pt-20">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          At Multigyan, accessible from www.multigyan.in, one of our main priorities is the privacy of our visitors.
          This Privacy Policy document describes the types of information we collect and how we use it.
        </p>
        <p className="mb-4">
          We may collect personal information like your name and email address when you submit forms or leave comments.
          This information is only used for communication purposes and is never sold or shared with third parties.
        </p>
        <p className="mb-4">
          We also use cookies and Google services (e.g., Google Analytics or AdSense) which may collect anonymous usage data.
          By using our site, you consent to our Privacy Policy and agree to its terms.
        </p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    )
  }
  