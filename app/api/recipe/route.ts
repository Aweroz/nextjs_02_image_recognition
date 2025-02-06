import { NextRequest } from 'next/server';
import dbConnect from '../../lib/mongodb';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchName = searchParams.get('name');

  const client = await dbConnect();
  if (client === null) return new Response("DB connection error", { status: 400 });

  // Choose a name for your database
  const database = client.db(process.env.DB_NAME);

  // Choose a name for your collection
  const collection = database.collection("dishes");

   // Query for a dish
   const query = searchName ? { name: searchName } : {};
   const options = {
     projection: {},
   };
  const data = await collection.findOne(query, options);

  return Response.json(data);
}


export async function POST(request:Request) {
  const dishData = await request.json();

  const client = await dbConnect();
  if (client === null) return new Response("DB connection error", { status: 400 });

  // Choose a name for your database
  const database = client.db(process.env.DB_NAME);

  // Choose a name for your collection
  const collection = database.collection("dishes");

  await collection.insertOne(dishData);
  return Response.json({});
}