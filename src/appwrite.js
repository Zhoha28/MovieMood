import {Client, Databases, ID, Query} from "appwrite";
console.log("APPWRITE_PROJECT_ID:", process.env.APPWRITE_PROJECT_ID);
console.log("APPWRITE_DB_ID:", process.env.APPWRITE_DB_ID);
console.log("APPWRITE_COLLECTIONS_ID:", process.env.APPWRITE_COLLECTIONS_ID);


const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.APPWRITE_DB_ID;
const COLLECTIONS_ID = process.env.APPWRITE_COLLECTIONS_ID;

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)
const database = new Databases(client)

// Function
export const updateSearchCount = async (searchTerm, movie) => {
//     1. Use appwrite to check forsearch term in db
//     2. if it does, update count
//     3. else, create new entry and count as 1
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTIONS_ID, [Query.equal('searchTerm', searchTerm),
        ])

        if(result.documents.length > 0){
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTIONS_ID, doc.$id, {
                count: doc.count + 1,
            })
        }
        else{
            await database.createDocument(DATABASE_ID, COLLECTIONS_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }
    }
    catch (e) {
        console.log(e)
    }

}



export const getTrendingMovies = async() => {
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTIONS_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ])
        return result.documents;
    }
    catch(e) {
        console.log(e)
    }
}