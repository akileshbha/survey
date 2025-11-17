"use server";
import { db } from "@/db/index";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";


// Create
export async function createUser(name: string, age: number, email: string) {
    const user: typeof usersTable.$inferInsert = {
        name: name,
        age: age,
        email: email,
    };

    await db.insert(usersTable).values(user);
}

// Read
export async function getUsers() {
    return await db.select().from(usersTable);
}
// Update
export async function updateUser(id: number, name: string, email: string) {
    await db.update(usersTable).set({ name, email }).where(eq(usersTable.id, id));
}

// Delete
export async function deleteUser(id: number) {
    await db.delete(usersTable).where(eq(usersTable.id, id));
    // await db.delete(usersTable).where(eq(usersTable.email, email));
}


/*
const users: {
  id: number;
  name: string;
  age: number;
  email: string;
}[]
*/

// await db
//     .update(usersTable)
//     .set({
//         age: 31,
//     })
//     .where(eq(usersTable.email, user.email));

// await db.delete(usersTable).where(eq(usersTable.email, user.email));
