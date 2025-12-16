// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: [
      "scontent.fdac24-2.fna.fbcdn.net",
      "www.undp.org",
      "scontent.fdac24-1.fna.fbcdn.net",
      "media.licdn.com",
      "media.prothomalo.com",
      "scontent.fdac198-1.fna.fbcdn.net",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
