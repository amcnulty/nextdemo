import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const examples = await db.example.findMany();
      res.status(200).json(examples);
    } catch (error) {
      console.error("Error getting examples", error);
      res.status(500).json({ error: "Unable to get examples" });
    } finally {
      await db.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
