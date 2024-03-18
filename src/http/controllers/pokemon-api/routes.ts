import { listPokemon } from "./list";
import { FastifyInstance } from "fastify";
import { verifyJWT } from "src/http/middlewares/verify-jwt";

export async function pokemonApiRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/pokemon", listPokemon);
}
