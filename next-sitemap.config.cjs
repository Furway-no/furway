const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  "https://example.com";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  exclude: ["/posts-sitemap.xml", "/pages-sitemap.xml", "/*", "/posts/*"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/posts-sitemap.xml`],
    policies: [
      {
        disallow: "/admin/*",
        userAgent: "*",
      },
    ],
  },
  siteUrl: SITE_URL,
};
