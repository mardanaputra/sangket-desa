import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Memuat variabel dari file .env
dotenv.config();

export default defineConfig({
  datasource: {
    // Prisma db pull membutuhkan direct connection (Port 5432)
    url: process.env.DIRECT_URL,
  },
});