import { GetNumberPokemonsTeamUseCase } from "../create-team";
import { PrismaTeamRepository } from "../../repositories/prisma/prisma-teams-repository";

export function makeGetNumberPokemonsTeamUseCase() {
  const teamRepository = new PrismaTeamRepository();
  const useCase = new GetNumberPokemonsTeamUseCase(teamRepository);

  return useCase;
}
