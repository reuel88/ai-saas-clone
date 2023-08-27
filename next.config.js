/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "cdn.openai.com",
      "res.cloudinary.com",
      "s3.us-west-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
