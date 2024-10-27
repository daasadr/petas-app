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
       typescript: {
    // během vývoje můžete nastavit na true, pro produkci na false
    ignoreBuildErrors: true,
  },
  eslint: {
    // během vývoje můžete nastavit na true, pro produkci na false
    ignoreDuringBuilds: true,
  },
 

};

export default nextConfig;
