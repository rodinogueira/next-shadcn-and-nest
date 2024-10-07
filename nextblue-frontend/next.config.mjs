// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Todas as chamadas que começam com /api
          destination: 'http://localhost:3003/:path*', // Redireciona para o backend em 3003
        },
      ];
    },
  };
  
  export default nextConfig;
  