import fastify, { FastifyInstance } from "fastify";
import { UserRoutes } from "./http/controllers/users/routes";

const app: FastifyInstance = fastify();

app.register(UserRoutes);

app
    .listen({ 
        port: 3100
    })
    .then(() => { 
        console.log(`Server is running on http://localhost:3100`) 
    })
    .catch((err) => { 
        console.error(err) 
    });