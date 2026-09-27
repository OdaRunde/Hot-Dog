import { db, schema } from "$lib/server/db/index";
import { and, eq } from "drizzle-orm";

export type SelectUser = typeof schema.users.$inferSelect;
export type InsertUser = typeof schema.users.$inferInsert;

export async function getAllUsers(): Promise<SelectUser[]> {
    return db.select().from(schema.users);
}

export async function getUserById(id: number): Promise<SelectUser | null> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return user ?? null;
}

export async function getUserByEmail(email: string): Promise<SelectUser | null> {
    const [user] = await db.select().from(schema.users).where(and(eq(schema.users.email, email)));
    return user ?? null;
}

export async function getUserByUsername(username: string): Promise<SelectUser | null> {
    const [user] = await db.select().from(schema.users).where(and(eq(schema.users.username, username)));
    return user ?? null;
}

export async function insertUser(user: InsertUser): Promise<SelectUser | null> {
    const [newUser] = await db.insert(schema.users).values(user).returning();
    return newUser ?? null;
}

export async function updateUser(user: SelectUser): Promise<SelectUser | null> {
    const [updatedUser] = await db.update(schema.users).set(user).where(eq(schema.users.id, user.id)).returning();
    return updatedUser ?? null;
}

export async function deleteUser(id: number): Promise<SelectUser | null> {
    const [deletedUser] = await db.delete(schema.users).where(eq(schema.users.id, id)).returning();
    return deletedUser ?? null;
}
