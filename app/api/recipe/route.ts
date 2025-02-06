import { NextRequest } from 'next/server';
import dbConnect from '../../lib/mongodb';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchColor = searchParams.get('search');
  // search is "hello" for /api/recipe?search=hello

  const client = await dbConnect();
  if (client === null) return Response.error();

  // Choose a name for your database
  const database = client.db(process.env.DB_NAME);

  // Choose a name for your collection
  const collection = database.collection("dishes");

   // Query for a movie that has the title 'The Room'
   const query = searchColor ? { color: searchColor } : {};
   const options = {
     projection: {},
   };
  const allData = await collection.find(query, options).toArray();

  return Response.json(allData);
}
