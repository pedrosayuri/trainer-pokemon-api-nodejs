import { GetTeamUseCase } from "../create-team";
import { PrismaTeamRepository } from "../../repositories/prisma/prisma-teams-repository";

export function makeGetTeamUseCase() {
  const teamRepository = new PrismaTeamRepository();
  const useCase = new GetTeamUseCase(teamRepository);

  return useCase;
}
