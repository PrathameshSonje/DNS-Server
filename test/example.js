const flags = 0x0100; // Standard query with recursion desired

const parsed_flags = {
  QR: (flags >> 15) & 0x1,
  OPCODE: (flags >> 11) & 0xf,
  AA: (flags >> 10) & 0x1,
  TC: (flags >> 9) & 0x1,
  RD: (flags >> 8) & 0x1,
  RA: (flags >> 7) & 0x1,
  Z: (flags >> 4) & 0x7,
  RCODE: flags & 0xf,
};

const RCODE = parsed_flags.OPCODE === 0 ? 0 : 4;

console.log({...parsed_flags, RCODE});
