import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { GetTrainerProfileUseCase } from "./get-trainer-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryTrainersRepository } from "../repositories/in-memory/in-memory-trainers-repository";

let trainersRepository: InMemoryTrainersRepository;
let sut: GetTrainerProfileUseCase;

describe("Get Trainer Profile Use Case", () => {
  beforeEach(() => {
    trainersRepository = new InMemoryTrainersRepository();
    sut = new GetTrainerProfileUseCase(trainersRepository);
  });

  it("should be able to get trainer profile", async () => {
    const createdTrainer = await trainersRepository.create({
      username: "John Doe",
      password_hash: await hash("123456", 6),
    });

    const { trainer } = await sut.execute({
      trainerId: createdTrainer.id,
    });

    expect(trainer.id).toEqual(expect.any(String));
    expect(trainer.username).toEqual("John Doe");
  });

  it("should not be able to get trainer profile with wrong id", async () => {
    expect(() =>
      sut.execute({
        trainerId: "non-existing-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
