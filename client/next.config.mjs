/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'm.media-amazon.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'rukminim2.flixcart.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.shopify.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'assets.myntassets.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'www.boat-lifestyle.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'placehold.co', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'img.freepik.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', port: '', pathname: '/**' },
    ],
  },
};

export default nextConfig;
