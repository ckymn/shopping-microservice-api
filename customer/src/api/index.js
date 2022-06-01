require("dotenv").config();
const databaseConnection = require("./v1/utils/connection.utils");
const createServer = require("./v1/utils/server.utils");

const app = await createServer(app);
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`listening to port ${PORT}`);

  await databaseConnection();
});
