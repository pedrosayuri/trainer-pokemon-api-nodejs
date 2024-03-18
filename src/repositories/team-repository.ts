import { Prisma, Team } from "@prisma/client";

export interface TeamRepository {
  findById(id: string): Promise<Team | null>;
  getTeam(trainerId: string): Promise<Team>;
  create(data: Prisma.TeamUncheckedCreateInput): Promise<Team>;
  countPokemonsInTeam(teamId: string, trainerId: string): Promise<number>;
  findByNameAndTrainerId(name: string, trainerId: string): Promise<Team | null>;
}
