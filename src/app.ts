import fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = fastify();

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