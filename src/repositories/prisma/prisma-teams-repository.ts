import { Prisma, Team } from "@prisma/client";
import { prisma } from "src/lib/prisma";

import { TeamRepository } from "../team-repository";

export class PrismaTeamRepository implements TeamRepository {
  async findById(id: string): Promise<Team | null> {
    const team = await prisma.team.findUnique({
      where: {
        id,
      },
    });
    return team;
  }

  async create(data: Prisma.TeamUncheckedCreateInput): Promise<Team> {
    const team = await prisma.team.create({
      data,
    });
    return team;
  }

  async getTeam(trainerId: string): Promise<Team> {
    const team = await prisma.team.findFirst({
      where: {
        trainer_id: trainerId,
      },
    });
    if (!team) {
      throw new Error("Team not found");
    }
    return team;
  }

  async countPokemonsInTeam(
    trainerId: string,
    teamId: string,
  ): Promise<number> {
    console.log("teamID - " + teamId);
    console.log("trainerID - " + trainerId);
    const countResult = await prisma.$queryRaw<{ count: string }[]>(
      Prisma.sql`SELECT COUNT(*) AS count FROM public.pokemons WHERE team_id = ${teamId} AND trainer_id = ${trainerId}`,
    );

    const count = parseInt(countResult[0].count);
    return count;
  }

  async findByNameAndTrainerId(
    name: string,
    trainerId: string,
  ): Promise<Team | null> {
    const team = await prisma.team.findFirst({
      where: {
        name,
        trainer_id: trainerId,
      },
    });

    return team;
  }
}
