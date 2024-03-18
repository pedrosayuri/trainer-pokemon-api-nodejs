import { randomUUID } from "node:crypto";
import { Trainer, Prisma } from "@prisma/client";
import { TrainersRepository } from "../trainers-repository";

export class InMemoryTrainersRepository implements TrainersRepository {
  public items: Trainer[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByUsername(username: string) {
    const user = this.items.find((item) => item.username === username);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.TrainerCreateInput) {
    const user = {
      id: randomUUID(),
      username: data.username,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
