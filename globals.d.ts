/* eslint-disable no-var */
import { MongoClient } from "mongodb";

// globals.d.ts
declare global {
  var mongo: { conn: MongoClient | null, promise: Promise };
}