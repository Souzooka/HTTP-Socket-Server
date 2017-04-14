const net = require('net');

const server= net.createServer( (c) => {
  c.on('data', (data) => {
    const header = data.toString().split('\r\n');
    const requestLine = header[0].split(' ');

    const method = requestLine[0];
    const path = requestLine[1];
    const httpVersion = requestLine[2];

    let headerAndBody = null;
    let body = null;

    switch(path) {
      case '/':
      case '/index.html':
        headerAndBody = `HTTP/1.1 200 OK
Content-Type : text/html
Content-Length: ${innerHTML.length}

${innerHTML}`;
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

const innerHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>The Elements</h1>
  <h2>These are all the known elements.</h2>
  <h3>These are 2</h3>
  <ol>
    <li>
      <a href="/hydrogen.html">Hydrogen</a>
    </li>
    <li>
      <a href="/helium.html">Helium</a>
    </li>
  </ol>
</body>
</html>
`