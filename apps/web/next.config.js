/** @type {import('next').NextConfig} */

const path = require('path');
const webpack = require("webpack");
const withPWA = require('next-pwa')({
  dest: 'public', // Output directory for the service worker
  disable: process.env.NODE_ENV === 'development',
  sw: 'service-worker.js', 
});

module.exports = withPWA({
  webpack: (config) => {
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias, // Preserve existing aliases
      '@components': path.join(__dirname, 'components'),
      '@styles': path.join(__dirname, 'styles'),
      // Add more aliases as needed
    };

    // Add custom Webpack plugin
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/keyv/, (data) => {
        delete data.dependencies[0].critical;
        return data;
      })
    );

    return config;
  },

  transpilePackages: ["@repo/ui", "@repo/common", "@repo/recoil"],
  
  images: {
    domains: [
      "d2szwvl7yo497w.cloudfront.net", 
      "appx-wsb-gcp.akamai.net.in"
    ], // Add your domain here
  },
});
