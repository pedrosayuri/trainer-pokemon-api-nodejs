import { InMemoryTrainersRepository } from "src/repositories/in-memory/in-memory-trainers-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { TrainerAlreadyExistsError } from "./errors/trainer-already-exists-error";

let trainerRespository: InMemoryTrainersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    trainerRespository = new InMemoryTrainersRepository();
    sut = new RegisterUseCase(trainerRespository);
  });

  it("should be able to register", async () => {
    const { trainer } = await sut.execute({
      username: "John Doe",
      password: "123456",
    });

    expect(trainer.id).toEqual(expect.any(String));
  });

  it("should hash trainer password", async () => {
    const { trainer } = await sut.execute({
      username: "John Doe",
      password: "123456",
    });

    const isPasswordCorretlyHashed = await compare(
      "123456",
      trainer.password_hash,
    );

    expect(isPasswordCorretlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const username = "John Doe";

    await sut.execute({
      username,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        username,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(TrainerAlreadyExistsError);
  });
});
