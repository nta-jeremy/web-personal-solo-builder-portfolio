import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const searchParams = new URLSearchParams(url.search);
  const title = searchParams.get('title') || 'Jeremy Nguyen';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#0a0a0a"/>
    <rect x="40" y="40" width="1120" height="550" rx="16" fill="#141414" stroke="#262626" stroke-width="2"/>
    <text x="600" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="700" fill="#f5f5f5" text-anchor="middle">${escapeXml(title)}</text>
    <text x="600" y="360" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="400" fill="#a3a3a3" text-anchor="middle">jeremytech.io.vn</text>
  </svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
