/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(
    (extension) => !extension.includes('test')
  ),
};

module.exports = nextConfig;
