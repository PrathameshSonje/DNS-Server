export enum Qtype {
    A = 1,
    NS,
    MD,
    MF,
    CNAME,
    SOA,
    MB,
    MG,
    ME,
    NULL,
    WKS, PTR,
    HINFO,
    MINFO,
    MX,
    TXT
}

export enum Qclass {
    IN = 1,
    CS,
    CH,
    HS
}

export class Question {
    NAME: string
    TYPE: Qtype
    CLASS: Qclass

    constructor(
        NAME: string,
        TYPE: Qtype,
        CLASS: Qclass
    ) {
        this.NAME = NAME;
        this.TYPE = TYPE;
        this.CLASS = CLASS;
    }

    static encode(questions: Question[]) {
        return Buffer.concat(questions.map((q) => {
            const { NAME, TYPE, CLASS } = q

            const domain = NAME.split('.');
            let encoded_domain = ``;
            domain.forEach((value) => {
                const hexLength = value.length.toString(16).padStart(2, '0');
                encoded_domain += `\\x${hexLength}`;
                encoded_domain += `${value}`;
            });
            encoded_domain += `\\x00`;

            const typeAndClass = Buffer.alloc(4)
            typeAndClass.writeInt16BE(TYPE, 0);
            typeAndClass.writeInt16BE(CLASS, 2);

            return Buffer.concat([Buffer.from(encoded_domain, 'binary'), typeAndClass]);
        }))
    }
}