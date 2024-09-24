"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DNSHeader = exports.DnsResponseCode = exports.HeaderValue = exports.OperationCode = exports.QueryResponse = void 0;
var QueryResponse;
(function (QueryResponse) {
    QueryResponse[QueryResponse["QUERY"] = 0] = "QUERY";
    QueryResponse[QueryResponse["RESPONSE"] = 1] = "RESPONSE";
})(QueryResponse || (exports.QueryResponse = QueryResponse = {}));
var OperationCode;
(function (OperationCode) {
    OperationCode[OperationCode["QUERY"] = 0] = "QUERY";
    OperationCode[OperationCode["IQUERY"] = 1] = "IQUERY";
    OperationCode[OperationCode["STATUS"] = 2] = "STATUS";
})(OperationCode || (exports.OperationCode = OperationCode = {}));
var HeaderValue;
(function (HeaderValue) {
    HeaderValue[HeaderValue["ZERO"] = 0] = "ZERO";
    HeaderValue[HeaderValue["ONE"] = 1] = "ONE";
})(HeaderValue || (exports.HeaderValue = HeaderValue = {}));
var DnsResponseCode;
(function (DnsResponseCode) {
    DnsResponseCode[DnsResponseCode["NO_ERROR"] = 0] = "NO_ERROR";
    DnsResponseCode[DnsResponseCode["FORMAT_ERROR"] = 1] = "FORMAT_ERROR";
    DnsResponseCode[DnsResponseCode["SERVER_FAILURE"] = 2] = "SERVER_FAILURE";
    DnsResponseCode[DnsResponseCode["NAME_ERROR"] = 3] = "NAME_ERROR";
    DnsResponseCode[DnsResponseCode["NOT_IMPLEMENTED"] = 4] = "NOT_IMPLEMENTED";
    DnsResponseCode[DnsResponseCode["REFUSED"] = 5] = "REFUSED";
})(DnsResponseCode || (exports.DnsResponseCode = DnsResponseCode = {}));
class DNSHeader {
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
        const flags = (this.QR << 15) |
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
exports.DNSHeader = DNSHeader;
