const { connection, createServer } = require("./v1/utils");
const config = require("./v1/config");
const Routes = require("./v1/routes");

config();

const app = createServer();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

app.listen(PORT, async () => {
  console.log(`listening to port http://${HOST}:${PORT}/api/v1`);

  await connection();

  app.use("/api/v1", Routes);
});
