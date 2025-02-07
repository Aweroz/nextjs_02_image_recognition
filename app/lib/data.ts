import dbConnect from "./mongodb";

export async function findDish(name: string) {
  try {
    const client = await dbConnect();
    if (client === null) return null;

    // Choose a name for your database
    const database = client.db(process.env.DB_NAME);

    // Choose a name for your collection
    const collection = database.collection("dishes");

    // Query for a dish
    const query = { name };
    const data = await collection.findOne(query);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to find dish.');
  }
}


export async function getDishes(limit: number) {
  try {
    const client = await dbConnect();
    if (client === null) return null;

    // Choose a name for your database
    const database = client?.db(process.env.DB_NAME);

    // Choose a name for your collection
    const collection = database.collection("dishes");

    const cursor = await collection.find({}).limit(limit);
    const data = await cursor.toArray();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get dishes.');
  }
}

export async function insertDish(dish:JSON) {
  try {
    const client = await dbConnect();
    if (client === null) return null;

    // Choose a name for your database
    const database = client.db(process.env.DB_NAME);

    // Choose a name for your collection
    const collection = database.collection("dishes");

    await collection.insertOne(dish);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get dishes.');
  }
}