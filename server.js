const net = require('net');
const fs = require('fs');

const server= net.createServer( (c) => {

  c.on('data', (data) => {
    const header = data.toString().split('\r\n');
    const requestLine = header[0].split(' ');

    const method = requestLine[0];
    const path = requestLine[1];
    const httpVersion = requestLine[2];

    let file = null;
    let headerAndBody = null;

    switch(path) {
      case '/':
      case '/index.html':
        file = fs.readFileSync('index.html', 'utf8');
        headerAndBody = `HTTP/1.1 200 OK
Content-Type : text/html
Content-Length: ${file.length}

${file}`;
        c.write(headerAndBody);
        c.end();
        break;
      default:
        headerAndBody = `HTTP/1.1 404 NOT FOUND`;
        c.write(headerAndBody);
        c.end();
    }
  });
});

server.listen(8080);