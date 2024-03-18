-- CreateTable
CREATE TABLE "trainers" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trainers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemons" (
    "id" TEXT NOT NULL,
    "species_id" TEXT NOT NULL,
    "nickname" TEXT,
    "trainer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon_species" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type_1" TEXT,
    "type_2" TEXT,

    CONSTRAINT "pokemon_species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon_evolutions" (
    "id" TEXT NOT NULL,
    "base_species_id" TEXT NOT NULL,
    "evolved_species_id" TEXT NOT NULL,

    CONSTRAINT "pokemon_evolutions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trainers_username_key" ON "trainers"("username");

-- AddForeignKey
ALTER TABLE "pokemons" ADD CONSTRAINT "pokemons_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemons" ADD CONSTRAINT "pokemons_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "pokemon_species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon_evolutions" ADD CONSTRAINT "pokemon_evolutions_base_species_id_fkey" FOREIGN KEY ("base_species_id") REFERENCES "pokemon_species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon_evolutions" ADD CONSTRAINT "pokemon_evolutions_evolved_species_id_fkey" FOREIGN KEY ("evolved_species_id") REFERENCES "pokemon_species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
