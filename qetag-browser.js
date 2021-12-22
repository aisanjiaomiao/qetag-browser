const qEtag = {
    sha1: sha1.digest,
    get: (buffer) => {
        let blockSize = 4 * 1024 * 1024;// 以4M为单位分割
        let sha1String = [];//记录每个块的sha1值
        let prefix = 0x16;
        let bufferSize = buffer.size || buffer.length || buffer.byteLength;//获取字节长度
        let blockCount = Math.ceil(bufferSize / blockSize);// 需要切割的块数量
        for (var i = 0; i < blockCount; i++)
            sha1String.push(qEtag.sha1(buffer.slice(i * blockSize, (i + 1) * blockSize)));
        if (!sha1String.length) return 'Fto5o-5ea0sNMlW_75VgGJCv2AcJ';
        let sha1Buffer = qEtag.concatArr2Uint8(sha1String, blockCount * 20);
        if (blockCount > 1) {
            prefix = 0x96;
            sha1Buffer = qEtag.sha1(sha1Buffer.buffer);// 如果大于4M，则对各个块的sha1结果再次sha1
        }
        sha1Buffer = qEtag.concatArr2Uint8([[prefix], ...sha1Buffer], sha1Buffer.length + 1);
        return qEtag.uint8ToBase64(sha1Buffer, true);
    },
    concatArr2Uint8: (arr, length) => Uint8Array.from(arr.reduce((total, currentValue) => total.concat(currentValue), []).slice(0, length)),
    uint8ToBase64: (u8Arr, urisafe) => {//Uint8Array 2 Base64
        let CHUNK_SIZE = 0x8000; //arbitrary number
        let index = 0;
        let length = u8Arr.length;
        let result = '';
        let slice;
        while (index < length) {
            slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
            result += String.fromCharCode.apply(null, slice);
            index += CHUNK_SIZE;
        }
        return urisafe ? btoa(result).replace(/\//g, '_').replace(/\+/g, '-') : btoa(result);
    }
};
