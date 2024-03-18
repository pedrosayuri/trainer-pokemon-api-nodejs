/*
  Warnings:

  - Added the required column `pokemon_name` to the `pokemons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemons" ADD COLUMN     "pokemon_name" TEXT NOT NULL;
