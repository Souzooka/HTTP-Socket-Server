/*jshint esversion:6*/
const net = require('net');

const uri = process.argv[2];

if (!uri) {
  throw new Error('Usage is "client.js <URL>"');
}

const client = net.connect({port:8080}, () => {

  const header = `GET ${uri} HTTP/1.1`;
  client.write(header);

  client.on('data', (data) => {
    const response = data.toString().split('\n\n');
    process.stdout.write(response[1].toString());
  });
});