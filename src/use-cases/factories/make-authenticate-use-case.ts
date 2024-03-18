import { AuthenticateUseCase } from "../authenticate";
import { PrismaTrainersRepository } from "src/repositories/prisma/prisma-trainers-repository";

export function makeAuthenticateUseCase() {
  const trainersRepository = new PrismaTrainersRepository();
  const authenticateUseCase = new AuthenticateUseCase(trainersRepository);

  return authenticateUseCase;
}
