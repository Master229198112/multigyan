import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeRaw from 'rehype-raw'

export default function MarkdownPreview({ content }) {
  return (
    <div className="prose dark:prose-invert max-w-none prose-lg break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        linkTarget="_blank"
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
