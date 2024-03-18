import { randomUUID } from "node:crypto";
import { Team, Prisma } from "@prisma/client";
import { TeamRepository } from "../team-repository";

export class InMemoryTeamRepository implements TeamRepository {
  public items: Team[] = [];

  async findById(id: string) {
    const team = this.items.find((item) => item.id === id);

    if (!team) {
      return null;
    }

    return team;
  }

  async create(data: Prisma.TeamUncheckedCreateInput) {
    const team: Team = {
      id: randomUUID(),
      name: data.name,
      trainer_id: data.trainer_id,
    };

    this.items.push(team);

    return team;
  }
}
