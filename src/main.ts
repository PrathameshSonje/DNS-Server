import * as dgram from "dgram";
import { DNSHeader } from "./header";
import { Qclass, Qtype, Question } from "./question";
import { Answer } from "./answer";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");


const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(data);
        
        const header = new DNSHeader();
        header.ID = 1234

        const question = new Question('codecrafters.io', Qtype.A, Qclass.IN);
        const encoded_question = Question.encode([question])
        header.QDCOUNT += 1

        const answer = new Answer('codecrafters.io', Qtype.A, Qclass.IN, 60, 4, '8.8.8.8')
        const encoded_answer = Answer.encode([answer]);
        header.ANCOUNT += 1

        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        const response = Buffer.concat([header.encode(), encoded_question, encoded_answer]);
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
