import * as dgram from "dgram";
import { DNSHeader } from "./header";
import { Qclass, Qtype, Question } from "./question";
import { Answer } from "./answer";
import headerParser from './headerParser'

const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1", () => {
    console.log('UDP server is running on 127.0.0.1:2053');
});

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log('Received data:', data);
        const { packet_id, flags } = headerParser(data)
        const header = new DNSHeader();
        header.ID = packet_id;
        header.OPCODE = flags.OPCODE;
        header.RD = flags.RD;
        header.RCODE = flags.RCODE
        header.QDCOUNT += 1;
        header.ANCOUNT += 1;

        // Encode question and answer
        const question = new Question('codecrafters.io', Qtype.A, Qclass.IN);
        const encoded_question = Question.encode([question]);

        const answer = new Answer('codecrafters.io', Qtype.A, Qclass.IN, 60, 4, '8.8.8.8');
        const encoded_answer = Answer.encode([answer]);

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

    } catch (e: any) {
        console.log(`Error sending data: ${e.message}`, e.stack);
    }
});
