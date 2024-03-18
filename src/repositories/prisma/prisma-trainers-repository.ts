import { Prisma } from "@prisma/client";
import { prisma } from "src/lib/prisma";

import { TrainersRepository } from "../trainers-repository";

export class PrismaTrainersRepository implements TrainersRepository {
  async findById(id: string) {
    const trainer = prisma.trainer.findUnique({
      where: {
        id,
      },
    });

    return trainer;
  }

  async findByUsername(username: string) {
    const trainer = await prisma.trainer.findUnique({
      where: {
        username,
      },
    });
    return trainer;
  }

  async create(data: Prisma.TrainerCreateInput) {
    const trainer = await prisma.trainer.create({
      data,
    });

    return trainer;
  }
}
