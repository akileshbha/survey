import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { usersTable } from './schema';
  
export const db = drizzle(process.env.DATABASE_URL!);
