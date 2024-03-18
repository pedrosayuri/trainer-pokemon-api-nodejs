import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "../../middlewares/verify-jwt";

export async function trainersRoutes(app: FastifyInstance) {
  app.post("/trainers", register);

  app.post("/sessions", authenticate);

  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
