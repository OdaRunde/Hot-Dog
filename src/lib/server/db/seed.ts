import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { reset, seed } from "drizzle-seed";
import * as schema from "./schema";
import { sql } from "drizzle-orm";

// type SelectUser = typeof schema.users.$inferSelect;
type InsertUser = typeof schema.users.$inferInsert;
// type SelectDog = typeof schema.dogs.$inferSelect;
// type InsertDog = typeof schema.dogs.$inferInsert;
// type SelectCompetition = typeof schema.competitions.$inferSelect;
// type InsertCompetition = typeof schema.competitions.$inferInsert;
type InsertMedia = typeof schema.media.$inferInsert;
// type SelectMedia = typeof schema.media.$inferSelect;

const breeds: string[] = [
    "German Shepherd", "Belgian Malinois", "Rottweiler", "Doberman Pinscher",
    "Tibetan Mastiff", "Bloodhound", "Beagle", "Greyhound", "Rhodesian Ridgeback",
    "Siberian Husky", "Alaskan Malamute", "Samoyed", "Akita Inu", "Jack Russell Terrier",
    "Bull Terrier", "Border Terrier", "Golden Retriever", "Labrador Retriever", "Poodle",
    "Boxer", "Great Dane", "Chihuahua", "Saint Bernard", "Cane Corso", "Shiba Inu", "Dalmatian"
];

const MEDIA_URL_BASE = "uploads/"

const userAvatarMedia: InsertMedia[] = [
    { mediaUrl: MEDIA_URL_BASE + "avatars/captain_america.webp" },
    { mediaUrl: MEDIA_URL_BASE + "avatars/cat.webp" },
    { mediaUrl: MEDIA_URL_BASE + "avatars/jarvis.jpg" },
    { mediaUrl: MEDIA_URL_BASE + "avatars/jonas_gahr_støre.jpg" },
    { mediaUrl: MEDIA_URL_BASE + "avatars/keving_hart.jpg" },
    { mediaUrl: MEDIA_URL_BASE + "avatars/the_rock.gif" },
];

const dogAvatarMedia: InsertMedia[] = [
    { mediaUrl: MEDIA_URL_BASE + "dogs/angry_wolf.png" },
    { mediaUrl: MEDIA_URL_BASE + "dogs/anuc_atittawan.png" },
    { mediaUrl: MEDIA_URL_BASE + "dogs/ashen_wolf.png" },
    { mediaUrl: MEDIA_URL_BASE + "dogs/not_a_wolf.jpg" },
    { mediaUrl: MEDIA_URL_BASE + "dogs/pale_wolf.png" },
    { mediaUrl: MEDIA_URL_BASE + "dogs/rusty_wolf.png" },
    { mediaUrl: MEDIA_URL_BASE + "dogs/snowy_wolf.png" },
    { mediaUrl: MEDIA_URL_BASE + "dogs/spotted_wolf.png" },
    { mediaUrl: MEDIA_URL_BASE + "dogs/striped_wolf.png" },
    { mediaUrl: MEDIA_URL_BASE + "dogs/tyrone.png" },
    { mediaUrl: MEDIA_URL_BASE + "dogs/woods_wolf.png" },
];

const competitionCoverMedia: InsertMedia[] = [
    { mediaUrl: MEDIA_URL_BASE + "covers/chill.png" },
];

async function main() {

    // ================================
    // Connect to database
    // ================================
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
    const client = postgres(process.env.DATABASE_URL);
    const db = drizzle(client, { schema });

    // ================================
    // Reset database
    // ================================
    console.log("Resetting...");
    await reset(db, schema);

    // ================================
    // Seed the database
    // ================================
    console.log("Seeding...");
    const userAvatarMeidaIds = (await db.insert(schema.media).values(userAvatarMedia)
            .returning({ id: schema.media.id })).map(row => row.id);
    
    const dogAvatarMediaIds = (await db.insert(schema.media).values(dogAvatarMedia)
            .returning({ id: schema.media.id })).map(row => row.id);

    const competitionCoverMediaIds = (await db.insert(schema.media).values(competitionCoverMedia)
            .returning({ id: schema.media.id })).map(row => row.id);

    await seed(db, { users: schema.users }).refine((f) => ({
        users: {
            count: 20,
            columns: {
                avatar: f.valuesFromArray({ values: userAvatarMeidaIds }),
            },
        }
    }));

    await seed(db, { dogs: schema.dogs }).refine((f) => ({
        dogs: {
            count: 20,
            columns: {
                avatar: f.valuesFromArray({ values: dogAvatarMediaIds }),
                breed: f.valuesFromArray({ values: breeds }),
            },
        }
    }));

    await seed(db, { competitions: schema.competitions }).refine((f) => ({
        competitions: {
            count: 10,
            columns: {
                cover: f.valuesFromArray({ values: competitionCoverMediaIds }),
                startDate: f.default({ defaultValue: new Date("2025.02.02") }),
                endDate: f.default({ defaultValue: new Date("2025.03.03") }),
            },
        }
    }));

    await db.execute(sql`
        SELECT setval(
            pg_get_serial_sequence('"users"', 'id'), 
            (SELECT MAX(id) FROM "users")
        );
    `);

    // ================================
    // Some manual seeding
    // ================================
    const admin: InsertUser = { firstName: "Bob", lastName: "By", username: "bobby", email: "bobby@gmail.com", password: "1234", role: "admin", avatar: userAvatarMeidaIds[0] };
    const adminId = await db.insert(schema.users).values(admin);

    const userIds = (await db.select({ id: schema.users.id }).from(schema.users)).map(row => row.id);
    const dogIds = (await db.select({ id: schema.dogs.id }).from(schema.dogs)).map(row => row.id);
    const competitionIds = (await db.select({ id: schema.competitions.id }).from(schema.competitions)).map(row => row.id);

    const userDogPairs = userIds.flatMap(u => dogIds.map(d => ({ userId: u, dogId: d })));
    const shuffledUserDogPairs = userDogPairs.sort(() => Math.random() - 0.5);

    await db.insert(schema.dowOwners).values(shuffledUserDogPairs.slice(0, 100));
    
    // ================================
    // Quit
    // ================================
    await client.end();
    console.log("Done");
}

main();