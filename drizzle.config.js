import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:4oAn0cNMrgvw@ep-noisy-shadow-a8fe5vk4.eastus2.azure.neon.tech/inspiro?sslmode=require',
  },
});