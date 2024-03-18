import { compare } from "bcryptjs";
import { Trainer } from "@prisma/client";
import { TrainersRepository } from "../repositories/trainers-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
  username: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  trainer: Trainer;
}

export class AuthenticateUseCase {
  constructor(private trainersRepository: TrainersRepository) {}

  async execute({
    username,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const trainer = await this.trainersRepository.findByUsername(username);

    if (!trainer) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, trainer.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      trainer,
    };
  }
}
