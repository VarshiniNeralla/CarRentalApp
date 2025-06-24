// const jsonServer = require("json-server");
// const path = require("path");

// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults({
//   static: path.join(__dirname, "uploads") // Serve static files from "uploads"
// });

// server.use(middlewares);
// server.use(router);

// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`JSON Server is running on http://localhost:${PORT}`);
// });


const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, "uploads") 
});

server.use(middlewares);
server.use("/api", router); // Optional: prefix API for clarity

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
