const config = {
  // Add this block to bypass the buggy Next 15 minifier
  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: false, 
      };
    }
    return config;
  },
  plugins: {
    '@tailwindcss/postcss': {}, // Updated for v4
  },
}

export default config