'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

/** Code block with copy-to-clipboard button and language label */
export function CodeBlock({ code, language = 'java' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-xl border border-border overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-surface/80 px-4 py-2 border-b border-border">
        <span className="text-xs font-mono text-text-muted uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {/* Code content */}
      <pre className="!m-0 !rounded-none !border-0 p-4 overflow-x-auto bg-surface/40">
        <code className="text-[0.8125rem] leading-relaxed font-mono">{code}</code>
      </pre>
    </div>
  );
}
