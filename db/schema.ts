import { int, mysqlTable, serial, varchar, text, json, timestamp  } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users_table', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const resultsTable = mysqlTable('results_table', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const errorLog = mysqlTable("error_log", {
  id: serial("id").primaryKey(),
  service: varchar("service", { length: 100 }).notNull(),  // client | server | worker | system
  level: varchar("level", { length: 50 }).notNull().default("error"), // error | warn | info
  message: text("message").notNull(), // short message
  stack: text("stack"),   // optional stacktrace
  payload: json("payload"),   // JSON payload (request body, context, params)
  userId: int("user_id"),   // optional foreign keys
  surveyId: int("survey_id"),
  path: varchar("path", { length: 255 }),   // which route failed (ex: /api/submit)
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
