import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => {
    return !data.draft && !data.hidden && data.locale === 'vi';
  });

  posts.sort((a, b) => {
    return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
  });

  return rss({
    title: 'Jeremy Nguyen — Blog (Tiếng Việt)',
    description: 'Viết về hệ thống, nghề thủ công và triết lý công nghệ.',
    site: context.site?.toString() || 'https://jeremytech.io.vn',
    items: posts.map((post) => {
      const slug = post.id.replace(/^vi\//, '');
      return {
        title: post.data.title,
        pubDate: new Date(post.data.pubDate),
        description: post.data.description,
        link: `/blog/${slug}/`,
        categories: [post.data.category, ...post.data.tags],
      };
    }),
    customData: `<language>vi</language>
<managingEditor>jeremy@jeremytech.io.vn (Jeremy Nguyen)</managingEditor>
    `.trim(),
  });
}
