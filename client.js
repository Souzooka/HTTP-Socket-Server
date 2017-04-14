/*jshint esversion:6*/
const net = require('net');
const os = require('os');
const networkInterfaces = os.networkInterfaces();
const url = require('url');

const commands = [];
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === undefined) {
    break;
  }
  commands.push(process.argv[i]);
}

if (commands[commands.length-1].slice(0, 9) !== 'localhost') {
  var requestedURL = url.parse(commands[commands.length-1]);
  var path = requestedURL.path;
  var port = requestedURL.port;
  var host = requestedURL.hostname;
} else {
  var port = 8080;
  var host = 'localhost';
  var path = commands[commands.length-1].slice(commands[commands.length-1].lastIndexOf('/'));
}


if (!path) {
  path = '/';
}

if (!port) {
  switch (requestedURL.protocol) {
    case 'http:':
      port = 80;
      break;
    default:
      port = 80;
      break;
  }
}

if (!url) {
  throw new Error('Usage is "client.js <URL>"');
}

const client = net.connect({port:port, host:host}, () => {

  const date = new Date();
  const dateStr = date.toUTCString();
  const address = networkInterfaces[Object.keys(networkInterfaces)[1]][0].address;
  const header = `GET ${path} HTTP/1.1
Date: ${dateStr}
Host: ${address}
User-Agent: Node 7.9.0\r\n\r\n`;
  client.write(header);

  client.on('data', (data) => {
    const response = data.toString().split('\n\n');
    if (response[1]) {
      process.stdout.write(response[1].toString());
    } else {
      process.stdout.write(response[0]);
    }

  });
});