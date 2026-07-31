import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stand-in photography for the screen-only build. Replaced by Kakao/Naver
    // place images once those APIs are wired up.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
