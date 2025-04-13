import Link from 'next/link'

export default function Footer() {
    return (
      <footer className="bg-gray-100 dark:bg-zinc-900 text-center py-4 mt-8 text-sm text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} Multigyan. All rights reserved.
        <br></br>
        <Link href="/privacy-policy">Privacy</Link>,&nbsp;
        <Link href="/terms">Terms</Link>,&nbsp;
        <Link href="/disclaimer">Disclaimer</Link>

      </footer>
    )
  }
  