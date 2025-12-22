import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // URL untuk migrasi dan db pull (Direct Connection)
    url: process.env.DIRECT_URL, 
  },
});