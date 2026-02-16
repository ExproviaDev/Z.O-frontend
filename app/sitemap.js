// app/sitemap.js তৈরি করে এটি বসান
export default function sitemap() {
  return [
    {
      url: 'https://www.zeroolympiad.com',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: 'https://www.zeroolympiad.com/register',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}