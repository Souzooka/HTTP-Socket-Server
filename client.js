/*jshint esversion:6*/
const net = require('net');
const os = require('os');
const networkInterfaces = os.networkInterfaces();

const uri = process.argv[2];

if (!uri) {
  throw new Error('Usage is "client.js <URI>"');
}

const client = net.connect({port:8080}, () => {

  const date = new Date();
  const dateStr = date.toUTCString();
  const address = networkInterfaces[Object.keys(networkInterfaces)[1]][0].address;
  const header = `GET ${uri} HTTP/1.1
Date: ${dateStr}
Host: ${address}
User-Agent: Node 7.9.0`;
  client.write(header);

  client.on('data', (data) => {
    const response = data.toString().split('\n\n');
    process.stdout.write(response[1].toString());
  });
});