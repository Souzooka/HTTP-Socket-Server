const net = require('net');
const request = [process.argv[2], process.argv[3], process.argv[4]];
console.log(request);

if (!request[0] || !request[1] || !request[2]) {
  throw new Error('Usage is "client.js <METHOD> <PATH> <HTTPVERSION>"');
}

if (!request[0].toLowerCase() !== 'get') {
  throw new Error('Only GET requests are implemented.');
}

net.connect({port:8080}, () => {

});