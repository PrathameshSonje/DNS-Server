// const flags = 0x0100; // Standard query with recursion desired

// const parsed_flags = {
//   QR: (flags >> 15) & 0x1,
//   OPCODE: (flags >> 11) & 0xf,
//   AA: (flags >> 10) & 0x1,
//   TC: (flags >> 9) & 0x1,
//   RD: (flags >> 8) & 0x1,
//   RA: (flags >> 7) & 0x1,
//   Z: (flags >> 4) & 0x7,
//   RCODE: flags & 0xf,
// };

// const RCODE = parsed_flags.OPCODE === 0 ? 0 : 4;

// console.log({...parsed_flags, RCODE});

const buffer = Buffer.from([
  0x5c, 0x78, 0x30, 0x63, 0x63, 0x6f, 0x64, 0x65, 0x63, 0x72, 0x61, 0x66, 0x74,
  0x65, 0x72, 0x73, 0x5c, 0x78, 0x30, 0x32, 0x69, 0x6f, 0x5c, 0x78, 0x30, 0x30,
]);

let decodedString = buffer.toString("utf8").replace(/\\x[0-9A-Fa-f]{2}/g, ".").slice(1, -1);


console.log(decodedString);
