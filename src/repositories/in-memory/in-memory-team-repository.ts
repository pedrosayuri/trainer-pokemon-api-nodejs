import { randomUUID } from "node:crypto";
import { Team, Prisma } from "@prisma/client";
import { TeamRepository } from "../team-repository";

export class InMemoryTeamRepository implements TeamRepository {
  public items: Team[] = [];

  async findById(id: string): Promise<Team | null> {
    const team = this.items.find((item) => item.id === id);
    return team || null;
  }

  async create(data: Prisma.TeamUncheckedCreateInput): Promise<Team> {
    const team: Team = {
      id: randomUUID(),
      name: data.name,
      trainer_id: data.trainer_id,
    };

    this.items.push(team);

    return team;
  }

  async getTeam(trainerId: string): Promise<Team> {
    const team = this.items.find((item) => item.trainer_id === trainerId);
    if (!team) {
      throw new Error("Team not found");
    }
    return team;
  }

  async countPokemonsInTeam(
    teamId: string,
    trainerId: string,
  ): Promise<number> {
    const team = this.items.find((item) => item.id === teamId);
    if (!team || team.trainer_id !== trainerId) {
      throw new Error("Team not found or does not belong to trainer");
    }
    return 0;
  }

  async findByNameAndTrainerId(
    name: string,
    trainerId: string,
  ): Promise<Team | null> {
    const team = this.items.find(
      (item) => item.name === name && item.trainer_id === trainerId,
    );
    return team || null;
  }
}
