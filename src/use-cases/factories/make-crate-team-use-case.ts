import { CreateTeamUseCase } from "../create-team";
import { PrismaTeamRepository } from "../../repositories/prisma/prisma-teams-repository";

export function makeCreateTeamUseCase() {
  const teamRepository = new PrismaTeamRepository();
  const useCase = new CreateTeamUseCase(teamRepository);

  return useCase;
}
