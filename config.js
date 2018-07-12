const POSTGRES_BASE_URI = 'ec2-34-204-72-83.compute-1.amazonaws.com';
const POSTGRES_DATABASE_CONFIG = {
  port: 5432,
  host: 'localhost'
};
const UNSPLASH_API_KEY =
  '54008d4032d0467ec44b27e6e2ab76efbf4e6b8a449cd18ea4bf29ca9946620c';
const NEW_RELIC_KEY = '17e03d299cd5173d46472f9c16f60a73d2da73d1';
module.exports = {
  POSTGRES_DATABASE_CONFIG,
  POSTGRES_BASE_URI,
  UNSPLASH_API_KEY,
  NEW_RELIC_KEY
};
