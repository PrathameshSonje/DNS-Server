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
Object.defineProperty(exports, "__esModule", { value: true });
const dgram = __importStar(require("dgram"));
const header_1 = require("./header");
const question_1 = require("./question");
const answer_1 = require("./answer");
// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");
const udpSocket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");
udpSocket.on("message", (data, remoteAddr) => {
    try {
        console.log(data);
        const header = new header_1.DNSHeader();
        header.ID = 1234;
        const question = new question_1.Question('codecrafters.io', question_1.Qtype.A, question_1.Qclass.IN);
        const encoded_question = question_1.Question.encode([question]);
        header.QDCOUNT += 1;
        const answer = new answer_1.Answer('codecrafters.io', question_1.Qtype.A, question_1.Qclass.IN, 60, 4, '8.8.8.8');
        const encoded_answer = answer_1.Answer.encode([answer]);
        header.ANCOUNT += 1;
        console.log(header, question, answer);
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        const response = Buffer.concat([header.encode(), encoded_question, encoded_answer]);
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    }
    catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
