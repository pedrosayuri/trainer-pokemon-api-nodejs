import { env } from "./env";
import fastify from "fastify";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import { trainersRoutes } from "./http/controllers/trainers/routes";
import { teamRoutes } from "./http/controllers/team/routes";
import { pokemonApiRoutes } from "./http/controllers/pokemon-api/routes";
import { pokemonTeamRoutes } from "./http/controllers/pokemon/routes";

export const app = fastify();

app.register(fastifyCors, {
  origin: true,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(trainersRoutes);
app.register(teamRoutes);
app.register(pokemonApiRoutes);
app.register(pokemonTeamRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  reply.status(400).send({ message: error.message });
});
