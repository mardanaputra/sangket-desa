/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  
  images: {
    remotePatterns: [
      {
        // Konfigurasi untuk hostname 'localhost'
        protocol: 'http', 
        hostname: 'localhost', 
        port: '8000', 
        pathname: '/**', 
      },
      {
        // Konfigurasi untuk IP loopback '127.0.0.1'
        // Ini mengatasi error 'resolved to private ip'
        protocol: 'http', 
        hostname: '127.0.0.1', 
        port: '8000', 
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;