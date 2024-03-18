export class TrainerAlreadyExistsError extends Error {
  constructor() {
    super("Username already exists.");
  }
}
