export enum QueryResponse {
    QUERY,
    RESPONSE
}

export enum OperationCode {
    QUERY,
    IQUERY,
    STATUS
}

export enum HeaderValue {
    ZERO,
    ONE
}

export enum DnsResponseCode {
    NO_ERROR = 0,
    FORMAT_ERROR = 1,
    SERVER_FAILURE = 2,
    NAME_ERROR = 3,
    NOT_IMPLEMENTED = 4,
    REFUSED = 5
}


export interface DNSMessageHeader {
    ID: number;
    QR: QueryResponse;
    OPCODE: OperationCode;
    AA: HeaderValue;
    TC: HeaderValue;
    RD: HeaderValue;
    RA: HeaderValue;
    Z: HeaderValue;
    RCODE: DnsResponseCode;
    QDCOUNT: number;
    ANCOUNT: number;
    NSCOUNT: number;
    ARCOUNT: number;
}

export class DNSHeader implements DNSMessageHeader {
    ID: number;
    QR: QueryResponse;
    OPCODE: OperationCode;
    AA: HeaderValue;
    TC: HeaderValue;
    RD: HeaderValue;
    RA: HeaderValue;
    Z: HeaderValue;
    RCODE: DnsResponseCode;
    QDCOUNT: number;
    ANCOUNT: number;
    NSCOUNT: number;
    ARCOUNT: number;

    constructor() {
        this.ID = Math.floor(Math.random() * 65536);
        this.QR = QueryResponse.RESPONSE;
        this.OPCODE = OperationCode.QUERY;
        this.AA = HeaderValue.ZERO;
        this.TC = HeaderValue.ZERO;
        this.RD = HeaderValue.ZERO;
        this.RA = HeaderValue.ZERO;
        this.Z = HeaderValue.ZERO;
        this.RCODE = DnsResponseCode.NO_ERROR;
        this.QDCOUNT = 0;
        this.ANCOUNT = 0;
        this.NSCOUNT = 0;
        this.ARCOUNT = 0;
    }

    encode() {
        const header = Buffer.alloc(12);
        header.writeUInt16BE(this.ID, 0);
        const flags =
            (this.QR << 15) |
            (this.OPCODE << 11) |
            (this.AA << 10) |
            (this.TC << 9) |
            (this.RD << 8) |
            (this.RA << 7) |
            (this.Z << 4) |
            this.RCODE;
        header.writeUInt16BE(flags, 2);
        header.writeUInt16BE(this.QDCOUNT, 4);
        header.writeUInt16BE(this.ANCOUNT, 6);
        header.writeUInt16BE(this.NSCOUNT, 8);
        header.writeUInt16BE(this.ARCOUNT, 10);
        return header;
    }

}