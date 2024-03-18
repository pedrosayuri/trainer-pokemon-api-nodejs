import { PrismaTrainersRepository } from "src/repositories/prisma/prisma-trainers-repository";
import { GetTrainerProfileUseCase } from "../get-trainer-profile";

export function makeGetTrainerProfileUseCase() {
  const trainersRepository = new PrismaTrainersRepository();
  const useCase = new GetTrainerProfileUseCase(trainersRepository);

  return useCase;
}
