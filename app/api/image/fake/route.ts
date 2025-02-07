/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from 'next/server';
import { getDishes } from '@/app/lib/data';

export async function POST(request: NextRequest) {
  const res = await getDishes(10);

  return Response.json({ dishes: res });
}