import { create } from "./create";
import { FastifyInstance } from "fastify";
import { verifyJWT } from "src/http/middlewares/verify-jwt";

export async function teamRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/team", create);
}
