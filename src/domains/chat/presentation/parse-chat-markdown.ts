export interface ChatInlineNode {
  type: 'text' | 'strong' | 'link';
  content: string;
  href?: string;
}

export type ChatStructuredBlock =
  | { type: 'heading'; content: ChatInlineNode[] }
  | { type: 'paragraph'; content: ChatInlineNode[] }
  | { type: 'list'; ordered: boolean; items: ChatInlineNode[][] }
  | { type: 'facts'; items: Array<{ label: ChatInlineNode[]; value: ChatInlineNode[] }> };

const inlinePattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|\*\*([^*]+)\*\*|(https?:\/\/[^\s<]+[^\s<.,!?;:)])/g;

function normalizeContent(content: string): string {
  return content.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

function parseFact(text: string) {
  const strongMatch = text.match(/^\*\*([^*]+?)\*\*:?[ \t]*(.+)$/);
  if (strongMatch) {
    return {
      label: parseInlineMarkdown(strongMatch[1].trim()),
      value: parseInlineMarkdown(strongMatch[2].trim()),
    };
  }

  const plainMatch = text.match(/^([^:\n]{2,40}):\s+(.+)$/);
  if (!plainMatch || plainMatch[1].includes('http')) {
    return null;
  }

  return {
    label: parseInlineMarkdown(plainMatch[1].trim()),
    value: parseInlineMarkdown(plainMatch[2].trim()),
  };
}

export function parseInlineMarkdown(text: string): ChatInlineNode[] {
  const nodes: ChatInlineNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(inlinePattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      nodes.push({ type: 'text', content: text.slice(lastIndex, index) });
    }

    if (match[1] && match[2]) {
      nodes.push({ type: 'link', content: match[1], href: match[2] });
    } else if (match[3]) {
      nodes.push({ type: 'strong', content: match[3] });
    } else if (match[4]) {
      nodes.push({ type: 'link', content: match[4], href: match[4] });
    }

    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return nodes.length > 0 ? nodes : [{ type: 'text', content: text }];
}

export function parseChatMarkdown(content: string): ChatStructuredBlock[] {
  const normalized = normalizeContent(content);
  if (!normalized) {
    return [];
  }

  const blocks: ChatStructuredBlock[] = [];
  const lines = normalized.split('\n');
  const paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) {
      return;
    }

    blocks.push({
      type: 'paragraph',
      content: parseInlineMarkdown(paragraphLines.join(' ')),
    });
    paragraphLines.length = 0;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    const headingMatch = line.match(/^#{1,3}\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      blocks.push({ type: 'heading', content: parseInlineMarkdown(headingMatch[1].trim()) });
      continue;
    }

    const listMatch = line.match(/^([-*]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      const ordered = /\d+\./.test(listMatch[1]);
      const items: string[] = [];

      while (index < lines.length) {
        const current = lines[index].trim();
        const currentMatch = current.match(/^([-*]|\d+\.)\s+(.+)$/);
        if (!currentMatch) {
          index -= 1;
          break;
        }
        items.push(currentMatch[2].trim());
        index += 1;
      }

      const facts = items.map(parseFact);
      if (facts.every(Boolean)) {
        blocks.push({
          type: 'facts',
          items: facts as Array<{ label: ChatInlineNode[]; value: ChatInlineNode[] }>,
        });
      } else {
        blocks.push({
          type: 'list',
          ordered,
          items: items.map((item) => parseInlineMarkdown(item)),
        });
      }
      continue;
    }

    const fact = parseFact(line);
    if (fact) {
      flushParagraph();
      const facts = [fact];

      while (index + 1 < lines.length) {
        const next = lines[index + 1].trim();
        if (!next) {
          break;
        }
        const nextFact = parseFact(next);
        if (!nextFact) {
          break;
        }
        facts.push(nextFact);
        index += 1;
      }

      blocks.push({ type: 'facts', items: facts });
      continue;
    }

    paragraphLines.push(line);
  }

  flushParagraph();
  return blocks;
}
