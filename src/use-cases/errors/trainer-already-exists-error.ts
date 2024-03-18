export class TrainerAlreadyExistsError extends Error {
  constructor() {
    super("Username já cadastrado.");
  }
}
