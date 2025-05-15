// Imports the built-in Node.js http module
import http from "http";

// Imports the Express application instance
import app from "./app.js";
const port = 3000;

// Passing Express app instance to http.createServer().
// This integrates Express with the HTTP server, allowing Express to handle all the incoming requests.
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
