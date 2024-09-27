const questionParser = (data: Buffer) => {
    const domain_name = data.toString("utf8").replace(/\\x[0-9A-Fa-f]{2}/g, ".").slice(1, -5);
    const type = data.readInt16BE(data.length - 4)
    const _class = data.readInt16BE(data.length - 2)
    return { domain_name }
}

export default questionParser