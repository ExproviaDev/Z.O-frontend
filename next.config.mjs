/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "zeroolympiad.pronizam.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "scontent.**.fna.fbcdn.net" },
      { protocol: "https", hostname: "www.undp.org" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "media.prothomalo.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "ibb.co.com" }, 
    ],
  },
};

export default nextConfig;