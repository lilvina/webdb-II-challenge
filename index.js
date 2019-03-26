const express = require('express');
const helmet = require('helmet');

const server = express();
const zoosRouter = require('./zoos/zoos-router.js')

server.use(express.json());
server.use(helmet());

// endpoints here
server.use('/api/zoos', zoosRouter)

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
