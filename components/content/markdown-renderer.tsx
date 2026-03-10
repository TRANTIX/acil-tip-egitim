"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose-acil ${className}`}>
      <style>{`
        .prose-acil h1, .prose-acil h2, .prose-acil h3, .prose-acil h4 {
          color: var(--foreground);
          font-weight: 700;
          line-height: 1.3;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose-acil h1 { font-size: 1.75rem; }
        .prose-acil h2 { font-size: 1.375rem; border-bottom: 1px solid var(--border); padding-bottom: 0.375rem; }
        .prose-acil h3 { font-size: 1.125rem; }
        .prose-acil p { color: var(--foreground); line-height: 1.75; margin-bottom: 1rem; }
        .prose-acil ul, .prose-acil ol { padding-left: 1.5rem; margin-bottom: 1rem; }
        .prose-acil li { color: var(--foreground); line-height: 1.75; margin-bottom: 0.25rem; }
        .prose-acil strong { font-weight: 700; color: var(--foreground); }
        .prose-acil em { font-style: italic; }
        .prose-acil code {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 0.125rem 0.375rem;
          font-size: 0.875em;
          color: #60a5fa;
        }
        .prose-acil pre {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1rem;
          overflow-x: auto;
          margin-bottom: 1rem;
        }
        .prose-acil pre code {
          background: none;
          border: none;
          padding: 0;
          color: var(--foreground);
        }
        .prose-acil table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }
        .prose-acil th {
          background: var(--card);
          border: 1px solid var(--border);
          padding: 0.5rem 0.75rem;
          text-align: left;
          font-weight: 600;
          color: var(--foreground);
        }
        .prose-acil td {
          border: 1px solid var(--border);
          padding: 0.5rem 0.75rem;
          color: var(--foreground);
        }
        .prose-acil tr:nth-child(even) td {
          background: var(--card);
        }
        .prose-acil blockquote {
          border-left: 3px solid #3b82f6;
          padding-left: 1rem;
          margin: 1rem 0;
          color: var(--muted-foreground);
          font-style: italic;
        }
        .prose-acil hr {
          border-color: var(--border);
          margin: 1.5rem 0;
        }
        .prose-acil a {
          color: #60a5fa;
          text-decoration: underline;
        }
      `}</style>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
