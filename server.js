const net = require('net');
const fs = require('fs');

const server = net.createServer( (c) => {

  c.on('data', (data) => {
    const header = data.toString().split('\r\n');
    const requestLine = header[0].split(' ');

    const method = requestLine[0];
    const path = requestLine[1];
    const httpVersion = requestLine[2];

    let response = null;

    if (method === "GET") {
      response = getResource(path, httpVersion);
      c.write(response);
      c.end();
    }
  });
});

function generateResponse(file) {
  const fileContents = fs.readFileSync(file, 'utf8');
  return `HTTP/1.1 200 OK
Content-Type : text/html
Content-Length: ${fileContents.length}

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
      return generateResponse('404.html');
  }
}

server.listen(8080);