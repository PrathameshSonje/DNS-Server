// Function to generate DNS flags
function generateDNSFlags(qr, opcode, aa, tc, rd, ra, z, rcode) {
    let flags = 0;
    flags |= (qr & 0x1) << 15;     // QR: Bit 15
    flags |= (opcode & 0xF) << 11; // OPCODE: Bits 14-11
    flags |= (aa & 0x1) << 10;     // AA: Bit 10
    flags |= (tc & 0x1) << 9;      // TC: Bit 9
    flags |= (rd & 0x1) << 8;      // RD: Bit 8
    flags |= (ra & 0x1) << 7;      // RA: Bit 7
    flags |= (z & 0x7) << 4;       // Z: Bits 6-4
    flags |= (rcode & 0xF);        // RCODE: Bits 3-0
    return flags;
}

// Generate flags with QR = 1 and OPCODE = 1
const flags = generateDNSFlags(1, 1, 0, 0, 1, 0, 0, 0);

// Convert to hexadecimal
const hexFlags = "0x" + flags.toString(16).padStart(4, '0').toUpperCase();

console.log("Flags value:", flags);
console.log("Flags in hexadecimal:", hexFlags);

// Function to parse and print flags (for verification)
function parseAndPrintFlags(flags) {
    const parsed_flags = {
        QR: (flags >> 15) & 0x1,
        OPCODE: (flags >> 11) & 0xF,
        AA: (flags >> 10) & 0x1,
        TC: (flags >> 9) & 0x1,
        RD: (flags >> 8) & 0x1,
        RA: (flags >> 7) & 0x1,
        Z: (flags >> 4) & 0x7,
        RCODE: flags & 0xF
    };

    console.log("\nParsed Flags:");
    console.log("QR     (Query/Response):", parsed_flags.QR);
    console.log("OPCODE (Operation Code):", parsed_flags.OPCODE);
    console.log("AA     (Authoritative Answer):", parsed_flags.AA);
    console.log("TC     (Truncation):", parsed_flags.TC);
    console.log("RD     (Recursion Desired):", parsed_flags.RD);
    console.log("RA     (Recursion Available):", parsed_flags.RA);
    console.log("Z      (Reserved):", parsed_flags.Z);
    console.log("RCODE  (Response Code):", parsed_flags.RCODE);
}

// Verify the generated flags
parseAndPrintFlags(flags);