const net = require('net');
const fs = require('fs');

const server = net.createServer( (c) => {

  c.on('data', (data) => {
    const header = data.toString().split('\r\n');
    const requestLine = header[0].split(' ');

    const method = requestLine[0];
    const path = requestLine[1];
    const httpVersion = requestLine[2];

    let file = null;
    let headerAndBody = null;

    switch(method) {
      case 'GET':
        switch(path) {
          case '/':
          case '/index':
          case '/index.html':
            file = fs.readFileSync('index.html', 'utf8');
            headerAndBody = `HTTP/1.1 200 OK
Content-Type : text/html
Content-Length: ${file.length}

${file}`;
            c.write(headerAndBody);
            c.end();
            break;
          case '/hydrogen':
          case '/hydrogen.html':
            file = fs.readFileSync('hydrogen.html', 'utf8');
            headerAndBody = `HTTP/1.1 200 OK
Content-Type : text/html
Content-Length: ${file.length}

${file}`;
            c.write(headerAndBody);
            c.end();
            break;
          case '/helium':
          case '/helium.html':
            file = fs.readFileSync('helium.html', 'utf8');
            headerAndBody = `HTTP/1.1 200 OK
Content-Type : text/html
Content-Length: ${file.length}

${file}`;
            c.write(headerAndBody);
            c.end();
            break;
          case '/css/styles':
          case '/css/styles.css':
            file = fs.readFileSync('css/styles.css', 'utf8');
            headerAndBody = `HTTP/1.1 200 OK
Content-Type : text/css
Content-Length: ${file.length}

${file}`;
            c.write(headerAndBody);
            c.end();
            break;
          case '/404':
          case '/404.html':
          default:
            file = fs.readFileSync('404.html', 'utf8');
            headerAndBody = `HTTP/1.1 404 NOT FOUND
Content-Type : text/html
Content-Length: ${file.length}

${file}`;
            c.write(headerAndBody);
            c.end();
        }
        break;
      default:
        break;
    }
  });
});

server.listen(8080);