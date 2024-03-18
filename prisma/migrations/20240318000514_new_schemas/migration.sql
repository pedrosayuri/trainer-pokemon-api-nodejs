/*
  Warnings:

  - You are about to drop the column `nickname` on the `pokemons` table. All the data in the column will be lost.
  - You are about to drop the column `species_id` on the `pokemons` table. All the data in the column will be lost.
  - You are about to drop the `pokemon_evolutions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pokemon_species` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pokemon_evolutions" DROP CONSTRAINT "pokemon_evolutions_base_species_id_fkey";

-- DropForeignKey
ALTER TABLE "pokemon_evolutions" DROP CONSTRAINT "pokemon_evolutions_evolved_species_id_fkey";

-- DropForeignKey
ALTER TABLE "pokemons" DROP CONSTRAINT "pokemons_species_id_fkey";

-- AlterTable
ALTER TABLE "pokemons" DROP COLUMN "nickname",
DROP COLUMN "species_id";

-- DropTable
DROP TABLE "pokemon_evolutions";

-- DropTable
DROP TABLE "pokemon_species";
