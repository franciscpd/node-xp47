const express = require("express");

const database = require("./services/database");

const mainRoutes = require("./routes/main");
const filmeRoutes = require("./routes/filme");
const generoRoutes = require("./routes/genero");

const server = express();
const port = 3000;

server.use(express.json());
server.use("/", mainRoutes);
server.use("/filmes", filmeRoutes);
server.use("/generos", generoRoutes);

try {
  database.authenticate();

  server.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
  });
} catch (error) {
  console.error("Não foi possível conectar com o banco de dados:", error);
}
