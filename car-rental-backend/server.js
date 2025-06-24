

// const jsonServer = require("json-server");
// const path = require("path");

// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults({
//   static: path.join(__dirname, "uploads") 
// });

// server.use(middlewares);
// server.use("/api", router); 

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`JSON Server is running on http://localhost:${PORT}`);
// });


// server.js
// server.js
const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// 🔹 1. Serve uploads folder as static files
//    Any file in ./uploads/** will be accessible via /uploads/<filename>
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🔹 2. Apply default JSON Server middlewares (with CORS, logger, etc.)
app.use(middlewares);

// 🔹 3. Parse request bodies so PATCH/POST works
app.use(jsonServer.bodyParser);

// 🔹 4. Mount the database router under /api/*
app.use('/api', router);

// 🔹 5. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
