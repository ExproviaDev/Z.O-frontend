// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactCompiler: true,
//   images: {
//     domains: [
//       "scontent.fdac24-2.fna.fbcdn.net",
//       "www.undp.org",
//       "scontent.fdac24-1.fna.fbcdn.net",
//       "media.licdn.com",
//       "media.prothomalo.com",
//       "scontent.fdac198-1.fna.fbcdn.net",
//       "images.unsplash.com",
//       "via.placeholder.com",
//       "res.cloudinary.com",
//     ],
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "scontent.**.fna.fbcdn.net" },
      { protocol: "https", hostname: "www.undp.org" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "media.prothomalo.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
