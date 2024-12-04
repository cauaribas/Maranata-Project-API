import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastify, { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors"; // Importando o plugin CORS
import { UserRoutes } from "./http/controllers/users/routes";
import { AuthRoutes } from "./http/controllers/auth/routes";
import { PatientRoutes } from "./http/controllers/patients/routes";

const app: FastifyInstance = fastify();

app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
});

app.register(UserRoutes);
app.register(AuthRoutes);
app.register(PatientRoutes);

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie, {
  parseOptions: {
    sameSite: "none",
    secure: true,
  },
});

app
  .listen({
    port: 3100,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`Server is running on http://localhost:3100`);
  })
  .catch((err) => {
    console.error(err);
  });
