
const http = require('http');
const https = require('https');

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  const options = {
    hostname: "localhost",
    path: req.url,
    headers: req.headers
  };

  const request = https.get(options, response => {
    res.writeHead(response.statusCode, response.headers);
    response.pipe(res);
  });

  request.on('error', err => {
    console.error(err);
    res.end();
  });

  request.end();
});

const port = 8085;
server.listen(port, () => {
  console.log(`CORS proxy server listening on port ${port}`);
});


