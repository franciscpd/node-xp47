const express = require("express");

const database = require("./services/database");

const mainRoutes = require("./routes/main");
const filmeRoutes = require("./routes/filme");
const generoRoutes = require("./routes/genero");
const clienteRoutes = require("./routes/cliente");

const handleErrorMiddleware = require("./middlewares/handleError");

const server = express();
const port = 3000;

server.use(express.json());
server.use("/", mainRoutes);
server.use("/filmes", filmeRoutes);
server.use("/generos", generoRoutes);
server.use("/clientes", clienteRoutes);

server.use(handleErrorMiddleware);

server.use((req, res) => {
  res.sendStatus(404);
});

const main = async () => {
  try {
    await database.authenticate();
    // await database.sync();

    server.listen(port, () => {
      console.log(`Servidor executando na porta ${port}`);
    });
  } catch (error) {
    console.error("Não foi possível conectar com o banco de dados:", error);
  }
};

main();
