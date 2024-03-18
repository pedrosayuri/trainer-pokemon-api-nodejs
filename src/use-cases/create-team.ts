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
    const team = await this.teamRepository.create({
      name: teamName,
      trainer_id: trainerId,
    });

    return {
      team,
    };
  }
}
