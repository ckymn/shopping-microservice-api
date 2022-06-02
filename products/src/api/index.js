const { connection, server } = require("./v1/utils");
const config = require("./v1/config");

config();

const app = server();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`listening to port ${PORT}`);

  await connection();
});
