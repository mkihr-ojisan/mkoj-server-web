/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: "/api/:path*",
                destination: "https://mc.mkihr-ojisan.com/api/:path*",
            },
        ];
    },
};

module.exports = nextConfig;
