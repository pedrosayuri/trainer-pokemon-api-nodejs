import { hash } from "bcryptjs";
import { Trainer } from "@prisma/client";
import { TrainersRepository } from "src/repositories/trainers-repository";
import { TrainerAlreadyExistsError } from "./errors/trainer-already-exists-error";

interface RegisterUseCaseRequest {
  username: string;
  password: string;
}

interface RegisterUseCaseResponse {
  trainer: Trainer;
}

export class RegisterUseCase {
  constructor(private trainerRepository: TrainersRepository) {}

  async execute({
    username,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameUsername =
      await this.trainerRepository.findByUsername(username);

    if (userWithSameUsername) {
      throw new TrainerAlreadyExistsError();
    }

    const trainer = await this.trainerRepository.create({
      username,
      password_hash,
    });

    return {
      trainer,
    };
  }
}
