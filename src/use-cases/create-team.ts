import { Team } from "@prisma/client";
import { TeamRepository } from "../repositories/team-repository";

interface CreateTeamUseCaseRequest {
  trainerId: string;
  teamName: string;
}

interface CreateTeamUseCaseResponse {
  team: Team;
}

export class CreateTeamUseCase {
  constructor(private teamRepository: TeamRepository) {}

  async execute({
    teamName,
    trainerId,
  }: CreateTeamUseCaseRequest): Promise<CreateTeamUseCaseResponse> {
    const existingTeam = await this.teamRepository.findByNameAndTrainerId(
      teamName,
      trainerId,
    );

    if (existingTeam) {
      throw new Error(
        "Já existe um time com esse nome, por favor escolha outro.",
      );
    }

    const team = await this.teamRepository.create({
      name: teamName,
      trainer_id: trainerId,
    });

    return {
      team,
    };
  }
}

export class GetTeamUseCase {
  constructor(private teamRepository: TeamRepository) {}

  async execute(trainerId: string): Promise<Team> {
    return this.teamRepository.getTeam(trainerId);
  }
}

export class GetNumberPokemonsTeamUseCase {
  constructor(private teamRepository: TeamRepository) {}

  async execute(trainerId: string, teamId: string): Promise<number> {
    const numberOfPokemons = await this.teamRepository.countPokemonsInTeam(
      teamId,
      trainerId,
    );

    return numberOfPokemons;
  }
}
