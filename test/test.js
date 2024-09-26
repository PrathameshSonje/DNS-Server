const dgram = require('dgram');

const dnsQuery = Buffer.from('123401000001000000000000', 'hex');
const client = dgram.createSocket('udp4');

const serverPort = 2053;
const serverAddress = '127.0.0.1'; 

client.send(dnsQuery, serverPort, serverAddress, (err) => {
  if (err) {
    console.error('Failed to send packet:', err);
    client.close();
  } else {
    console.log('DNS query packet sent successfully');
  }
});

client.on('message', (msg, rinfo) => {
  console.log(`Received response from ${rinfo.address}:${rinfo.port}`);
  console.log('Response data:', msg.toString('hex'));
  client.close();
});

client.on('error', (err) => {
  console.error('Socket error:', err);
  client.close();
});

setTimeout(() => {
  console.log('No response received, closing socket');
  client.close();
}, 1000);

// const dgram = require('dgram');

// // Method 1: Hexadecimal representation
// const dnsQueryHex = Buffer.from('AAAA010000010000000000000765 78616D706C6503636F6D0000010001', 'hex');

// // Method 2: Binary representation (array of byte values)
// const dnsQueryBinary = Buffer.from([
//   0xAA, 0xAA, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
//   0x07, 0x65, 0x78, 0x61, 0x6D, 0x70, 0x6C, 0x65, 0x03, 0x63, 0x6F, 0x6D, 
//   0x00, 0x00, 0x01, 0x00, 0x01
// ]);

// // Method 3: Mixed representation (problematic, for demonstration only)
// const dnsQueryMixed = Buffer.concat([
//   Buffer.from([0xAA, 0xAA, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07]),
//   Buffer.from('example.com', 'utf8'),
//   Buffer.from([0x00, 0x00, 0x01, 0x00, 0x01])
// ]);

// console.log('Hex method:', dnsQueryHex);
// console.log('Binary method:', dnsQueryBinary);
// console.log('Mixed method:', dnsQueryMixed);

// console.log('Hex and Binary are equal:', dnsQueryHex.equals(dnsQueryBinary));
// console.log('Hex and Mixed are equal:', dnsQueryHex.equals(dnsQueryMixed));

// // Function to send the packet
// function sendPacket(buffer) {
//   const client = dgram.createSocket('udp4');
//   client.send(buffer, 53, '8.8.8.8', (err) => {
//     if (err) console.error('Failed to send packet:', err);
//     else console.log('Packet sent successfully');
//     client.close();
//   });
// }
