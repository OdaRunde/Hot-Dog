import { sql } from 'drizzle-orm';
import { pgTable, integer, text, varchar, date, primaryKey, pgEnum, timestamp, check, foreignKey, index, uniqueIndex } from 'drizzle-orm/pg-core';

export const roles = pgEnum("role", ["guest", "user", "admin"]);

/**
 * Users
 */
export const users = pgTable("users", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	firstName: varchar("first_name", { length: 256 }).notNull(),
	lastName: varchar("last_name", { length: 256 }).notNull(),
	username: varchar("username", { length: 256 }).unique(),
	email: varchar("email", { length: 256 }).notNull().unique(),
	password: varchar("password", { length: 256 }).notNull(),
	role: roles("role").notNull().default("user"),
	avatar: integer("avatar").references(() => media.id),
}, (t) => [
	uniqueIndex("users_username_lower_idx").on(sql`lower(${t.username})`),
]);

/**
 * Dogs
 */
export const dogs = pgTable("dogs", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	name: varchar("name", { length: 256 }),
	breed: varchar("breed", { length: 256 }),
	birthDate: date("birth_date"),
	avatar: integer("avatar").references(() => media.id),
});

/**
 * Dow owners
 */
export const dowOwners = pgTable("dog_owners", {
	userId: integer("user_id").notNull().references(() => users.id),
	dogId: integer("dog_id").notNull().references(() => dogs.id),
}, (t) => [
	primaryKey({ name: "dog_owners_pk", columns: [t.userId, t.dogId] }),
]);

/**
 * Competitions
 */
export const competitions = pgTable("competitions", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	title: varchar("title").notNull(),
	description: text("description"),
	startDate: timestamp("start_date", { withTimezone: true }).notNull(),
	endDate: timestamp("end_date", { withTimezone: true }).notNull(),
	breed: varchar("breed", { length: 256 }),
	cover: integer("cover").references(() => media.id),
}, (t) => [
	check("date_check", sql`${t.endDate} > ${t.startDate}`),
]);

/**
 * Participants
 */
export const participants = pgTable("participants", {
	competitionId: integer("competition_id").notNull().references(() => competitions.id),
	dogId: integer("dog_id").notNull().references(() => dogs.id),
}, (t) => [
	primaryKey({ name: "participants_pk", columns: [t.competitionId, t.dogId] }),
]);

/**
 * Media
 */
export const media = pgTable("media", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	mediaUrl: varchar("media_url", { length: 1024 }).notNull(),
});

/**
 * Participant media
 */
export const participantMedia = pgTable("participant_media", {
	competitionId: integer("competition_id").notNull(),
	dogId: integer("dog_id").notNull(),
	order: integer("order"). notNull(),
	mediaId: integer("media_id").notNull().references(() => media.id, { onDelete: "cascade" }),
}, (t) => [
	primaryKey({ name: "participant_media_pk", columns: [t.competitionId, t.dogId, t.order] }),
	foreignKey({
		name: "participantMedia_to_participants_fk",
        columns: [t.competitionId, t.dogId],
        foreignColumns: [participants.competitionId, participants.dogId],
    }).onDelete("cascade"),
	check("order_non_negative", sql`${t.order} >= 0`),
	index("idx_media_comp_dog").on(t.competitionId, t.dogId),
]);

/**
 * Comments
 */
export const comments = pgTable("comments", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
	competitionId: integer("competition_id").notNull(),
	dogId: integer("dog_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	comment: text("comment").notNull(),
}, (t) => [
	foreignKey({
		name: "comments_to_participants_fk",
        columns: [t.competitionId, t.dogId],
        foreignColumns: [participants.competitionId, participants.dogId],
    }).onDelete("cascade"),
	index("idx_comments_user_id").on(t.userId),
]);
