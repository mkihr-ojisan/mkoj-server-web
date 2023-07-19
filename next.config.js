/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.tydiumcraft.net",
            },
        ],
    },
};

module.exports = nextConfig;
