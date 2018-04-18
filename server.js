const http = require('http');
const app = require('./lib/app');
const connect = require('./lib/connect');

const PORT = process.env.PORT || 3000;

const MONGOD_URI = process.env.MONGOD_URI || 'mongodb://localhost:27017/trips';

connect(MONGOD_URI);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('server is running on', server.address().port);
});