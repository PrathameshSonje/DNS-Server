"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
class Answer {
    constructor(NAME, TYPE, CLASS, TTL, RDLENGTH, RDATA) {
        this.NAME = NAME;
        this.TYPE = TYPE;
        this.CLASS = CLASS;
        this.TTL = TTL;
        this.RDLENGTH = RDLENGTH;
        this.RDATA = RDATA;
    }
    static encode(answers) {
        return Buffer.concat(answers.map((q) => {
            const { NAME, TYPE, CLASS, TTL, RDLENGTH, RDATA } = q;
            const domain = NAME.split('.');
            let encoded_domain = ``;
            domain.forEach((value) => {
                const hexLength = value.length.toString(16).padStart(2, '0');
                encoded_domain += `\\x${hexLength}`;
                encoded_domain += `${value}`;
            });
            encoded_domain += `\\x00`;
            const Fields = Buffer.alloc(14);
            Fields.writeInt16BE(TYPE, 0);
            Fields.writeInt16BE(CLASS, 2);
            Fields.writeInt16BE(TTL, 4);
            Fields.writeInt16BE(RDLENGTH, 8);
            const octects = RDATA.split('.').map(Number);
            console.log(octects);
            octects.forEach((value, index) => {
                console.log(value, index);
                Fields.writeInt8(value, 10 + index);
            });
            console.log(Fields);
            return Buffer.concat([Buffer.from(encoded_domain, 'binary'), Fields]);
        }));
    }
}
exports.Answer = Answer;
