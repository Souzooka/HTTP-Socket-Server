/*jshint esversion:6*/
const net = require('net');
const os = require('os');
const networkInterfaces = os.networkInterfaces();

const commands = [];
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === undefined) {
    break;
  }
  commands.push(process.argv[i]);
}

function getLocation(url) {
  var match = url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
  return match && {
      url: url,
      protocol: match[1],
      host: match[2],
      hostname: match[3],
      port: match[4],
      pathname: match[5],
      search: match[6],
      hash: match[7]
  };
}

const url = getLocation(commands[commands.length-1]);
let path = url.pathname;
const host = url.host;
let port = null;

if (!path) {
  path = '/';
}

if (!port) {
  switch (url.protocol) {
    case 'http:':
      port = 80;
      break;
    default:
      break;
  }
}

if (!url) {
  throw new Error('Usage is "client.js <URL>"');
}

console.log(host);
console.log(port);
console.log(path);

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