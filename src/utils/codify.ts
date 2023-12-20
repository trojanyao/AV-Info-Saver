/**
 * 将不同格式的番号标准化为统一格式
 *
 * @param {string} code 传入的未处理的番号
 * @returns {string} 标准化处理后的番号
 */
export function codify(code: string): string {
  /**
   * 无需处理
   * - 東京熱番号
   * - 包含连字符的番号
   */
  if (/n\d+/.test(code) || /-/.test(code)) {
    return code
  }

  /* 有字母的番号 */
  if (/[a-z,A-Z]/.test(code)) {
    const codeNum = code.match(/\d+/) // 数字
    const codeCap = code.match(/[A-Z,a-z]+/) // 字母

    let newCodeNum
    // 处理番号数字位大于3，有多个0的情况
    if (codeNum[0] && codeNum[0].length > 3) {
      newCodeNum = codeNum[0].slice(-3)
      code = code.replace(codeNum[0], newCodeNum)
    }
    return `${codeCap}-${codeNum}`.toUpperCase()
  }

  /* 其他情况 */
  return code
}
