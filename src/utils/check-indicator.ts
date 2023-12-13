// 编号标识列表
const INDICATORS = ['vol', 'Vol', 'VOL', 'Case', 'File', 'FILE', 'Talk', 'パート']

/**
 * 检测系列作品的标题中是否包含有标识的编号
 *
 * @param {string} workName 作品名
 * @returns {string | undefined} 检测出的标识和编号或 undefined
 */
export function checkIndicator(workName: string): string | undefined {
  // 是否包含编号标识
  const indicatorIndex = INDICATORS.findIndex((d) => workName.includes(d))

  if (indicatorIndex > -1) {
    // 包含编号标识：返回标识和编号部分

    // 标识类型
    let indicator = INDICATORS[indicatorIndex]

    // 标识符和编号部分
    const num = workName.match(new RegExp(indicator + '[\\S\\s]*\\d+'))?.[0]

    return num
  }

  // 不包含编号标识：返回 undefined
  return undefined
}
