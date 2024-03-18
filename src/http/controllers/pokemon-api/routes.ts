import { FastifyInstance } from "fastify";
import { listAllPokemon } from "./listAll";
import { listAllPokemonWithEvolutions } from "./listAllWithEvolutions";
import { verifyJWT } from "src/http/middlewares/verify-jwt";
import { listByNameAndTypes } from "./listByNameAndTypes";
import { listByNameAndTypesWithEvolutions } from "./listByNameAndTypesWithEvolutions";

interface ListPokemonOptions {
  name?: string;
  types?: string[];
}

export async function pokemonApiRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get(
    "/pokemon/listAllPokemonWithEvolutions",
    listAllPokemonWithEvolutions,
  );

  app.get("/pokemon/listAll", listAllPokemon);

  app.post(
    "/pokemon/listByNameAndTypesWithEvolutions",
    async (request, reply) => {
      try {
        const options: ListPokemonOptions = request.body as ListPokemonOptions;

        if (!options.name && !options.types) {
          reply.status(400).send({
            message: "Por favor, forneça pelo menos um nome ou tipo.",
          });
          return;
        }

        const pokemonList = await listByNameAndTypesWithEvolutions(options);

        if (pokemonList.length === 0) {
          reply
            .status(404)
            .send({ message: "O pokemon não foi encontrado na pokedex." });
        } else {
          reply.send(pokemonList);
        }
      } catch (error) {
        console.error("Error listing Pokémon:", error);
        reply.status(500).send({ message: "Internal server error." });
      }
    },
  );

  app.post("/pokemon/listByNameAndTypes", async (request, reply) => {
    try {
      const options: ListPokemonOptions = request.body as ListPokemonOptions;

      if (!options.name && !options.types) {
        reply.status(400).send({
          message: "Por favor, forneça pelo menos um nome ou tipo.",
        });
        return;
      }

      const pokemonList = await listByNameAndTypes(options);

      if (pokemonList.length === 0) {
        reply
          .status(404)
          .send({ message: "O pokemon não foi encontrado na pokedex." });
      } else {
        reply.send(pokemonList);
      }
    } catch (error) {
      console.error("Error listing Pokémon:", error);
      reply.status(500).send({ message: "Internal server error." });
    }
  });
}
