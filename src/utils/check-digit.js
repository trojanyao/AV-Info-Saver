// 检测是否包含纯数字
export function checkDigit(workName, seriesName) {
  let seriesNameNoSpace = seriesName.replaceAll(" ", "");

  /* 有纯数字编号也肯定是在标题中的系列名后跟着纯数字 */
  const reg = new RegExp(`\\s*${seriesNameNoSpace}\\s*(\\d+)`, "g");
  let matches = [...workName.replaceAll(" ", "").matchAll(reg)];

  for (const match of matches) {
    if (match.length >= 2) {
      // 说明匹配到了捕获组，将其返回（系列编号）
      return match[1];
    }
  }

  // 不包含纯数字
  return undefined;
}
