import { config } from 'dotenv';
config();

export default {
  SERVER: {
    PORT: Number(process.env.SERVER_PORT) || 8081,
    HOST: process.env.SERVER_HOST || '0.0.0.0',
  },
  DATABASE: {
    TABLES: {
      UPLOADS: 'uploads',
    },
  },
  CONSTRAINTS: {
    FORMAT: '.txt',
  },
  LOG_LEVEL: process.env.LOG_LEVEL ?? 'info',
  PER_CENT_DIVIDER: 100,
};
