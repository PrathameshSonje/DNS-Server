"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = exports.Qclass = exports.Qtype = void 0;
var Qtype;
(function (Qtype) {
    Qtype[Qtype["A"] = 1] = "A";
    Qtype[Qtype["NS"] = 2] = "NS";
    Qtype[Qtype["MD"] = 3] = "MD";
    Qtype[Qtype["MF"] = 4] = "MF";
    Qtype[Qtype["CNAME"] = 5] = "CNAME";
    Qtype[Qtype["SOA"] = 6] = "SOA";
    Qtype[Qtype["MB"] = 7] = "MB";
    Qtype[Qtype["MG"] = 8] = "MG";
    Qtype[Qtype["ME"] = 9] = "ME";
    Qtype[Qtype["NULL"] = 10] = "NULL";
    Qtype[Qtype["WKS"] = 11] = "WKS";
    Qtype[Qtype["PTR"] = 12] = "PTR";
    Qtype[Qtype["HINFO"] = 13] = "HINFO";
    Qtype[Qtype["MINFO"] = 14] = "MINFO";
    Qtype[Qtype["MX"] = 15] = "MX";
    Qtype[Qtype["TXT"] = 16] = "TXT";
})(Qtype || (exports.Qtype = Qtype = {}));
var Qclass;
(function (Qclass) {
    Qclass[Qclass["IN"] = 1] = "IN";
    Qclass[Qclass["CS"] = 2] = "CS";
    Qclass[Qclass["CH"] = 3] = "CH";
    Qclass[Qclass["HS"] = 4] = "HS";
})(Qclass || (exports.Qclass = Qclass = {}));
class Question {
    constructor(NAME, TYPE, CLASS) {
        this.NAME = NAME;
        this.TYPE = TYPE;
        this.CLASS = CLASS;
    }
    static encode(questions) {
        return Buffer.concat(questions.map((q) => {
            const { NAME, TYPE, CLASS } = q;
            const domain = NAME.split('.');
            let encoded_domain = ``;
            domain.forEach((value) => {
                const hexLength = value.length.toString(16).padStart(2, '0');
                encoded_domain += `\\x${hexLength}`;
                encoded_domain += `${value}`;
            });
            encoded_domain += `\\x00`;
            const typeAndClass = Buffer.alloc(4);
            typeAndClass.writeInt16BE(TYPE, 0);
            typeAndClass.writeInt16BE(CLASS, 2);
            return Buffer.concat([Buffer.from(encoded_domain, 'binary'), typeAndClass]);
        }));
    }
}
exports.Question = Question;
