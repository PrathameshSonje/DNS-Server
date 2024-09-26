"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram = __importStar(require("dgram"));
const header_1 = require("./header");
const question_1 = require("./question");
const answer_1 = require("./answer");
const headerParser_1 = __importDefault(require("./headerParser"));
const udpSocket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1", () => {
    console.log('UDP server is running on 127.0.0.1:2053');
});
udpSocket.on("message", (data, remoteAddr) => {
    try {
        console.log('Received data:', data);
        const { packet_id, flags } = (0, headerParser_1.default)(data);
        const header = new header_1.DNSHeader();
        header.ID = packet_id;
        header.OPCODE = flags.OPCODE;
        header.RD = flags.RD;
        header.RCODE = flags.RCODE;
        header.QDCOUNT += 1;
        header.ANCOUNT += 1;
        // Encode question and answer
        const question = new question_1.Question('codecrafters.io', question_1.Qtype.A, question_1.Qclass.IN);
        const encoded_question = question_1.Question.encode([question]);
        const answer = new answer_1.Answer('codecrafters.io', question_1.Qtype.A, question_1.Qclass.IN, 60, 4, '8.8.8.8');
        const encoded_answer = answer_1.Answer.encode([answer]);
        // Log encoded parts
        console.log('Encoded DNS header:', header.encode());
        console.log('Encoded question:', encoded_question);
        console.log('Encoded answer:', encoded_answer);
        // Create response buffer
        const response = Buffer.concat([header.encode(), encoded_question, encoded_answer]);
        console.log('Response to be sent:', response);
        // Send response
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
        console.log(`Response sent to ${remoteAddr.address}:${remoteAddr.port}`);
    }
    catch (e) {
        console.log(`Error sending data: ${e.message}`, e.stack);
    }
});
