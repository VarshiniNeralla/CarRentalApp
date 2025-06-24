

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
const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(middlewares);

app.use(jsonServer.bodyParser);

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
