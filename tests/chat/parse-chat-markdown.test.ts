import { describe, expect, it } from 'vitest';
import { parseChatMarkdown, parseInlineMarkdown } from '../../src/domains/chat/presentation/parse-chat-markdown';

describe('parseInlineMarkdown', () => {
  it('parses bold text and links', () => {
    expect(parseInlineMarkdown('Xem **Jeremy** tại https://jeremynguyen.tech')).toEqual([
      { type: 'text', content: 'Xem ' },
      { type: 'strong', content: 'Jeremy' },
      { type: 'text', content: ' tại ' },
      { type: 'link', content: 'https://jeremynguyen.tech', href: 'https://jeremynguyen.tech' },
    ]);
  });
});

describe('parseChatMarkdown', () => {
  it('parses markdown headings and paragraphs', () => {
    expect(parseChatMarkdown('# Jeremy\n\nKỹ sư phần mềm.')).toEqual([
      {
        type: 'heading',
        content: [{ type: 'text', content: 'Jeremy' }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', content: 'Kỹ sư phần mềm.' }],
      },
    ]);
  });

  it('converts labeled bullet items into fact cards', () => {
    expect(
      parseChatMarkdown([
        '- **Vai trò hiện tại:** Technical Leader tại YODY',
        '- **Công nghệ sở trường:** React, Go, PostgreSQL',
      ].join('\n')),
    ).toEqual([
      {
        type: 'facts',
        items: [
          {
            label: [{ type: 'text', content: 'Vai trò hiện tại:' }],
            value: [{ type: 'text', content: 'Technical Leader tại YODY' }],
          },
          {
            label: [{ type: 'text', content: 'Công nghệ sở trường:' }],
            value: [{ type: 'text', content: 'React, Go, PostgreSQL' }],
          },
        ],
      },
    ]);
  });

  it('keeps generic bullets as lists', () => {
    expect(parseChatMarkdown('- React\n- Go\n- PostgreSQL')).toEqual([
      {
        type: 'list',
        ordered: false,
        items: [
          [{ type: 'text', content: 'React' }],
          [{ type: 'text', content: 'Go' }],
          [{ type: 'text', content: 'PostgreSQL' }],
        ],
      },
    ]);
  });

  it('groups standalone labeled lines into facts', () => {
    expect(parseChatMarkdown('Website: https://jeremynguyen.tech\nGitHub: https://github.com/jeremynguyen252')).toEqual([
      {
        type: 'facts',
        items: [
          {
            label: [{ type: 'text', content: 'Website' }],
            value: [{ type: 'link', content: 'https://jeremynguyen.tech', href: 'https://jeremynguyen.tech' }],
          },
          {
            label: [{ type: 'text', content: 'GitHub' }],
            value: [{ type: 'link', content: 'https://github.com/jeremynguyen252', href: 'https://github.com/jeremynguyen252' }],
          },
        ],
      },
    ]);
  });
});
