const net = require('net');
const request = [process.argv[2], process.argv[3], process.argv[4]];

if (!request[0] || !request[1] || !request[2]) {
  throw new Error('Usage is "client.js <METHOD> <PATH> <HTTPVERSION>"');
}

const client = net.connect({port:8080}, () => {

  const header = `${request[0]} ${request[1]} ${request[2]}`;
  client.write(header);

  client.on('data', (data) => {
    const response = data.toString().split('\n\n');
    process.stdout.write(response[1].toString());
  });
});