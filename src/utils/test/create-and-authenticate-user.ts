import request from "supertest";
import { FastifyInstance } from "fastify";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post("/trainers").send({
    username: "John Doe",
    password: "123456",
  });

  const authResponse = await request(app.server).post("/sessions").send({
    username: "John Doe",
    password: "123456",
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}
