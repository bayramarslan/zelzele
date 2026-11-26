/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true
  },
  // Next 13, moduleResolution: "node" dayatıyor. Editör/type-check için modern
  // tsconfig.json kullanılırken build bu dosyayı kullansın.
  typescript: {
    tsconfigPath: "tsconfig.next.json"
  }
};

module.exports = nextConfig;
