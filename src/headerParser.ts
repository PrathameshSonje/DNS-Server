const parseFlags = (flags: number) => {
    const parsed_flags = {
        QR: (flags >> 15) & 0x1,    
        OPCODE: (flags >> 11) & 0xF, 
        AA: (flags >> 10) & 0x1,     
        TC: (flags >> 9) & 0x1,      
        RD: (flags >> 8) & 0x1,     
        RA: (flags >> 7) & 0x1,      
        Z: (flags >> 4) & 0x7,       
        RCODE: flags & 0xF 
    }

    const RCODE = parsed_flags.OPCODE === 0 ? 0 : 4

    return { ...parsed_flags, RCODE };
}


const headerParser = (data: Buffer) => {

    const packet_id = data.readUInt16BE(0);
    const flags = data.readUInt16BE(2)
    const QDCOUNT = data.readUInt16BE(4)
    const ANCOUNT = data.readUInt16BE(6)
    const NSCOUNT = data.readUint16BE(8)
    const ARCOUNT = data.readUInt16BE(10)

    return { packet_id, flags: parseFlags(flags), QDCOUNT, ANCOUNT, NSCOUNT, ARCOUNT };
}

export default headerParser