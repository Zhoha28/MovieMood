import { Client, Databases, ID, Query } from "appwrite";

const client = new Client()
    .setEndpoint("https://nyc.cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID);

const database = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DB_ID;
const COLLECTIONS_ID = process.env.APPWRITE_COLLECTIONS_ID;

export async function handler(event, context) {
    try {
        const body = JSON.parse(event.body || "{}");

        if (body.action === "updateSearchCount") {
            const { searchTerm, movie } = body;

            const result = await database.listDocuments(DATABASE_ID, COLLECTIONS_ID, [
                Query.equal("searchTerm", searchTerm),
            ]);

            if (result.documents.length > 0) {
                const doc = result.documents[0];
                await database.updateDocument(DATABASE_ID, COLLECTIONS_ID, doc.$id, {
                    count: doc.count + 1,
                });
            } else {
                await database.createDocument(DATABASE_ID, COLLECTIONS_ID, ID.unique(), {
                    searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                });
            }

            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        }

        if (body.action === "getTrendingMovies") {
            const result = await database.listDocuments(DATABASE_ID, COLLECTIONS_ID, [
                Query.limit(5),
                Query.orderDesc("count"),
            ]);
            return { statusCode: 200, body: JSON.stringify(result.documents) };
        }

        return { statusCode: 400, body: "Invalid action" };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
}
