import { RegisterUseCase } from "../register";
import { PrismaTrainersRepository } from "src/repositories/prisma/prisma-trainers-repository";

export function makeRegisterUseCase() {
  const trainersRepository = new PrismaTrainersRepository();
  const useCase = new RegisterUseCase(trainersRepository);

  return useCase;
}
