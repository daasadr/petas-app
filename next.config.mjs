/** @type {import('next').NextConfig} */
const nextConfig = {
    
    reactStrictMode: true,
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "cdn.sanity.io",
        },
    ],
      },
      env: {
        NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
        SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
      },
      experimental: {
        taint: true,
      },
};

export default nextConfig;
