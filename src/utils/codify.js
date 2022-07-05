// 品番 标准化
export function codify(code) {
    console.log('处理前番号', code)
    if (/n\d+/.test(code)) {
        // 東京熱番号
        return code
    } else if (/-/.test(code)) {
        // 包含连字符的番号无需处理
        return code
    } else if (/[a-z,A-Z]/.test(code)) {
        // 有字母的番号
        // 番号数字位
        let codeNum = code.match(/\d+/)
        let codeCap = code.match(/[A-Z,a-z]+/)
        let newCodeNum
        // 处理番号数字位大于3，有多个0的情况
        if (codeNum[0] && codeNum[0].length > 3) {
            newCodeNum = codeNum[0].slice(-3)
            code = code.replace(codeNum[0], newCodeNum)
        }
        return `${codeCap}-${codeNum}`.toUpperCase()
    } else {
        // 纯数字番号
        return code
    }
}