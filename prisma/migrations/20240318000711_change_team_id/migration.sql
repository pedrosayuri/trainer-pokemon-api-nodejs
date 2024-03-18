/*
  Warnings:

  - You are about to drop the column `teamId` on the `pokemons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pokemons" DROP CONSTRAINT "pokemons_teamId_fkey";

-- AlterTable
ALTER TABLE "pokemons" DROP COLUMN "teamId",
ADD COLUMN     "team_id" TEXT;

-- AddForeignKey
ALTER TABLE "pokemons" ADD CONSTRAINT "pokemons_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
