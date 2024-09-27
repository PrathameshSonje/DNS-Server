import * as dgram from "dgram";
import { DNSHeader } from "./header";
import { Qclass, Qtype, Question } from "./question";
import { Answer } from "./answer";
import headerParser from './headerParser'
import questionParser from './questionParser'

const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1", () => {
    console.log('UDP server is running on 127.0.0.1:2053');
});

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log('Received data:', data);
        const { packet_id, flags } = headerParser(data)
        const { domain_name } = questionParser(data.subarray(12))
        const header = new DNSHeader();
        header.ID = packet_id;
        header.OPCODE = flags.OPCODE;
        header.RD = flags.RD;
        header.RCODE = flags.RCODE
        header.QDCOUNT += 1;
        header.ANCOUNT += 1;

        const question = new Question(domain_name, Qtype.A, Qclass.IN);
        const encoded_question = Question.encode([question]);

        const answer = new Answer(domain_name, Qtype.A, Qclass.IN, 60, 4, '8.8.8.8');
        const encoded_answer = Answer.encode([answer]);

        console.log('Encoded DNS header:', header.encode());
        console.log('Encoded question:', encoded_question);
        console.log('Encoded answer:', encoded_answer);

        const response = Buffer.concat([header.encode(), encoded_question, encoded_answer]);
        console.log('Response to be sent:', response);

        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
        console.log(`Response sent to ${remoteAddr.address}:${remoteAddr.port}`);

    } catch (e: any) {
        console.log(`Error sending data: ${e.message}`, e.stack);
    }
});
