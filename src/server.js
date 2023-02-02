const express = require("express");

const database = require("./services/database");

const mainRoutes = require("./routes/main");
const filmeRoutes = require("./routes/filme");
const generoRoutes = require("./routes/genero");
const clienteRoutes = require("./routes/cliente");
const autenticacaoRoutes = require("./routes/autenticacao");

const handleErrorMiddleware = require("./middlewares/handleError");
const jwtMiddleware = require("./middlewares/jwt");
const authMiddleware = require("./middlewares/auth");

const server = express();
const port = 3000;

server.use(express.json());

server.use(
  jwtMiddleware.unless({
    path: ["/", "/autenticacao/login", "/autenticacao/registro"],
  })
);
server.use(authMiddleware);

server.use("/", mainRoutes);
server.use("/autenticacao", autenticacaoRoutes);
server.use("/filmes", filmeRoutes);
server.use("/generos", generoRoutes);
server.use("/clientes", clienteRoutes);

server.use(handleErrorMiddleware);

// server.use((req, res, next) => {
//   res.sendStatus(404);
// });

const main = async () => {
  try {
    await database.authenticate();
    // await database.sync({ force: true });

    server.listen(port, () => {
      console.log(`Servidor executando na porta ${port}`);
    });
  } catch (error) {
    console.error("Não foi possível conectar com o banco de dados:", error);
  }
};

main();
