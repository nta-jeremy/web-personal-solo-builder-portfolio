import { describe, it, expect } from 'vitest';
import { parseProviderPriority } from '../../src/domains/chat/infrastructure/ai-provider-adapter';

describe('parseProviderPriority', () => {
  it('parses full priority list in order', () => {
    expect(parseProviderPriority('yescale,deepseek,gemini,openai,anthropic')).toEqual([
      'yescale',
      'deepseek',
      'gemini',
      'openai',
      'anthropic',
    ]);
  });

  it('returns default order when env is missing', () => {
    expect(parseProviderPriority(undefined)).toEqual([
      'yescale',
      'deepseek',
      'gemini',
      'openai',
      'anthropic',
    ]);
  });

  it('returns default order when env is empty string', () => {
    expect(parseProviderPriority('')).toEqual([
      'yescale',
      'deepseek',
      'gemini',
      'openai',
      'anthropic',
    ]);
  });

  it('filters invalid providers', () => {
    expect(parseProviderPriority('yescale,invalid,deepseek,unknown')).toEqual([
      'yescale',
      'deepseek',
    ]);
  });

  it('handles whitespace and mixed case', () => {
    expect(parseProviderPriority(' Yescale , DEEPSEEK , Gemini ')).toEqual([
      'yescale',
      'deepseek',
      'gemini',
    ]);
  });

  it('allows partial priority list', () => {
    expect(parseProviderPriority('deepseek,yescale')).toEqual([
      'deepseek',
      'yescale',
    ]);
  });
});
