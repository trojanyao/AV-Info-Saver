/**
 * 检测系列作品的标题中是否包含纯数字编号
 *
 * @param {string} workName 作品名
 * @param {string} seriesName 系列名
 * @returns { string | undefined } 检测出的纯数字编号或 undefined（未检测出）
 */
export function checkDigit(workName: string, seriesName: string): string | undefined {
  const seriesNameNoSpace = seriesName.replaceAll(' ', '')

  /* 有纯数字编号也肯定是在标题中的系列名后跟着纯数字 */
  // 兼容「系列名 纯数字」和「#纯数字」两种格式
  const reg = new RegExp(`(?:\\s*${seriesNameNoSpace}\\s*(\\d+))|(?:#(\\d+))`, 'g')
  const matches = [...workName.replaceAll(' ', '').matchAll(reg)]

  for (const match of matches) {
    if (match.length >= 2) {
      // 说明匹配到了捕获组，将其返回（系列编号）
      return match[1] || match[2]
    }
  }

  // 不包含纯数字
  return undefined
}
