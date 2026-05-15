import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    hidden: z.boolean().default(false),
    image: z.string().optional(),
    readingTime: z.number().optional(),
    locale: z.enum(['en', 'vi']).default('en'),
    canonicalUrl: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tech: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    status: z.enum(['draft', 'published', 'archived']).default('published'),
    liveUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { blog, projects };
