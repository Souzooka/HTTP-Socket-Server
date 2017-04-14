/*jshint esversion:6*/
const net = require('net');
const fs = require('fs');

const headers = [];

const server = net.createServer( (c) => {

  c.on('data', (data) => {
    const header = data.toString().split('\r\n');
    const requestLine = header[0].split(' ');

    const method = requestLine[0];
    const path = requestLine[1];
    const httpVersion = requestLine[2];

    let response = null;

    storeHeader(header);
    if (method === "GET") {
      response = getResource(path, httpVersion);
      c.write(response);
      c.end();
    }
  });
});

function storeHeader(header) {
  headers.push(header);
}

function generateResponse(file, status = '200 OK') {
  const fileContents = fs.readFileSync(file, 'utf8');
  const date = new Date();
  const dateStr = date.toUTCString();
  return `HTTP/1.1 ${status}
Content-Type : text/html
Content-Length: ${fileContents.length}
Date: ${date.toUTCString()}
Server: HackerSpace

${fileContents}`;
}

function getResource(path, httpVersion) {
  let file = null;
  let headerAndBody = null;
  switch(path) {
    case '/':
    case '/index':
    case '/index.html':
      return generateResponse('index.html');
    case '/hydrogen':
    case '/hydrogen.html':
      return generateResponse('hydrogen.html');
    case '/helium':
    case '/helium.html':
      return generateResponse('helium.html');
    case '/css/styles':
    case '/css/styles.css':
      return generateResponse('css/styles.css');
    case '/404':
    case '/404.html':
    default:
      return generateResponse('404.html', '404 NOT FOUND');
  }
}

server.listen(8080);