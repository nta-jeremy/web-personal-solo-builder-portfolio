import type { ReactNode } from 'react';
import { parseChatMarkdown, type ChatInlineNode } from './parse-chat-markdown';

interface Props {
  content: string;
}

function renderInline(nodes: ChatInlineNode[]): ReactNode {
  return nodes.map((node, index) => {
    if (node.type === 'strong') {
      return <strong key={index} className="font-semibold text-[var(--ink)]">{node.content}</strong>;
    }

    if (node.type === 'link' && node.href) {
      return (
        <a
          key={index}
          href={node.href}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 break-all text-[var(--accent)]"
        >
          {node.content}
        </a>
      );
    }

    return <span key={index}>{node.content}</span>;
  });
}

export default function ChatMessageContent({ content }: Props) {
  const blocks = parseChatMarkdown(content);

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 text-[15px] leading-7 text-[var(--ink)]">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return (
            <h3 key={index} className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--ink)]">
              {renderInline(block.content)}
            </h3>
          );
        }

        if (block.type === 'paragraph') {
          return (
            <p key={index} className="text-[15px] leading-7 text-[var(--ink)]/90">
              {renderInline(block.content)}
            </p>
          );
        }

        if (block.type === 'facts') {
          return (
            <div key={index} className="space-y-2">
              {block.items.map((item, factIndex) => (
                <div
                  key={factIndex}
                  className="rounded-[14px] border border-[var(--border)]/70 bg-black/[0.03] px-3.5 py-3"
                >
                  <div className="text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--subtle)]">
                    {renderInline(item.label)}
                  </div>
                  <div className="mt-1 text-[15px] leading-6 text-[var(--ink)]/90">
                    {renderInline(item.value)}
                  </div>
                </div>
              ))}
            </div>
          );
        }

        return (
          <ol
            key={index}
            className={`space-y-2 pl-5 text-[15px] leading-7 text-[var(--ink)]/90 ${block.ordered ? 'list-decimal' : 'list-disc'}`}
          >
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="pl-1">
                {renderInline(item)}
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}
