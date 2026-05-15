import type { FC } from 'react';

interface StreamTextProps {
  text: string;
  delay?: number;
  speed?: number;
}

const StreamText: FC<StreamTextProps> = ({ text, delay = 0, speed = 40 }) => {
  const words = text.split(' ');

  return (
    <span className="stream">
      {words.map((word, index) => (
        <span
          key={index}
          style={{ animationDelay: `${delay + index * speed}ms` }}
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
};

export default StreamText;
