import { InMemoryTrainersRepository } from "../repositories/in-memory/in-memory-trainers-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let trainersRepository: InMemoryTrainersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    trainersRepository = new InMemoryTrainersRepository();
    sut = new AuthenticateUseCase(trainersRepository);
  });

  it("should be able to authenticate", async () => {
    await trainersRepository.create({
      username: "John Doe",
      password_hash: await hash("123456", 6),
    });

    const { trainer } = await sut.execute({
      username: "John Doe",
      password: "123456",
    });

    expect(trainer.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong username", async () => {
    await expect(() =>
      sut.execute({
        username: "johndoe@example.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await trainersRepository.create({
      username: "John Doe",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        username: "John Doe",
        password: "123123",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
