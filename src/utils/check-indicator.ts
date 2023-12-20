// 编号标识列表
const INDICATORS = ['vol.', 'Vol.', 'VOL.', 'Case.', 'File.', 'FILE.', 'Part', 'Talk.', 'パート']

/**
 * 检测系列作品的标题中是否包含有标识的编号
 *
 * @param {string} workName 作品名
 * @returns {string | undefined} 检测出的标识和编号或 undefined
 */
export function checkIndicator(workName: string): string | undefined {
  // 是否包含编号标识
  const indicator = INDICATORS.find((d) => workName.includes(d))

  if (indicator) {
    // 包含编号标识：返回标识和编号部分

    // 标识符和编号部分
    const regExp = new RegExp(indicator + '\\s{0,3}\\d+')
    const num = workName.match(regExp)?.[0]

    return num
  }

  // 不包含编号标识：返回 undefined
  return undefined
}
