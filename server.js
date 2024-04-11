import http from 'http';
import app from './app.js';
let PORT = 5000;

let server = http.createServer(app);

server.listen(5000, () => {
  console.log(`server running in ${PORT}`);
});
