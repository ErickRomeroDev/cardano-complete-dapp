import { DATABASE_ID, QUESTIONS_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID } from "node-appwrite";
import { z } from "zod";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    console.log("getting");
    const databases = c.get("databases");

    const questions = await databases.listDocuments(DATABASE_ID, QUESTIONS_ID);
    return c.json({ data: questions });
  })
  .post(
    "/",
    sessionMiddleware,  
    zValidator("json", z.object({ address: z.string() })),  
    async (c) => {
      // const address  = await c.req.json();  
      const { address }  = c.req.valid("json");         

      const databases = c.get("databases");

      await databases.createDocument(DATABASE_ID, QUESTIONS_ID, ID.unique(), {
        address
      });

      return c.json({ data: address });
    }
  );

export default app;
