import { TrainersRepository } from "src/repositories/trainers-repository";
import { Trainer } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetTrainerProfileUseCaseRequest {
  trainerId: string;
}

interface GetTrainerProfileUseCaseResponse {
  trainer: Trainer;
}

export class GetTrainerProfileUseCase {
  constructor(private trainerRepository: TrainersRepository) {}

  async execute({
    trainerId,
  }: GetTrainerProfileUseCaseRequest): Promise<GetTrainerProfileUseCaseResponse> {
    const trainer = await this.trainerRepository.findById(trainerId);

    if (!trainer) {
      throw new ResourceNotFoundError();
    }

    return {
      trainer,
    };
  }
}
