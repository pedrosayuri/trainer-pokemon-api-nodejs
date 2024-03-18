import { Prisma, Team } from "@prisma/client";

export interface TeamRepository {
  findById(id: string): Promise<Team | null>;
  create(data: Prisma.TeamUncheckedCreateInput): Promise<Team>;
}
