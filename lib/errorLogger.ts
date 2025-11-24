"use server";

import { db } from "@/db";
import { errorLog } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

type LogErrorInput = {
  message: string;
  stack?: string | null;
  service: string;     // server | client | worker | system
  level?: string;       // error | warn | info (default: error)
  path?: string | null;
  payload?: any;        // will be stored as JSON
  userId?: number | null;
  surveyId?: number | null;
};

export async function logError(error: LogErrorInput) {
  try {
    const entry: InferInsertModel<typeof errorLog> = {
      message: error.message,
      stack: error.stack ?? null,
      service: error.service,
      level: error.level ?? "error",
      path: error.path ?? null,
      payload: error.payload ?? null,
      userId: error.userId ?? null,
      surveyId: error.surveyId ?? null,
    };

    await db.insert(errorLog).values(entry);
  } catch (loggingErr) {
    // If logging fails, never break the API
    console.error("Failed to log error:", loggingErr);
  }
}
