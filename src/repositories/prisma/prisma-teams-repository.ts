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

  async create(data: Prisma.TeamCreateInput): Promise<Team> {
    const team = await prisma.team.create({
      data,
    });
    return team;
  }
}
