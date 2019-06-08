const http = require('http');
const dotenv = require('dotenv');
const app = require('../app');

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 5000;

app.set('port', port);

const server = http.createServer(app);
server.listen(port);
