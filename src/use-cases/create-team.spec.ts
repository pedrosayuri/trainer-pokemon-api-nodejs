import { InMemoryTeamRepository } from "src/repositories/in-memory/in-memory-team-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { CreateTeamUseCase } from "./create-team";

let teamRepository: InMemoryTeamRepository;
let sut: CreateTeamUseCase;

describe("Create Team Use Case", () => {
  beforeEach(() => {
    teamRepository = new InMemoryTeamRepository();
    sut = new CreateTeamUseCase(teamRepository);
  });

  it("should be able to create team", async () => {
    const { team } = await sut.execute({
      teamName: "Team Rocket",
      trainerId: "Team_ID",
    });

    expect(team.id).toEqual(expect.any(String));
  });

  it("should associate team with trainer", async () => {
    const { team } = await sut.execute({
      teamName: "Team Rocket",
      trainerId: "Team_ID",
    });

    expect(team.trainer_id).toEqual("Team_ID");
  });
});
