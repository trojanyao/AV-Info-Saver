import { AVWork } from '../typings'

/**
 * 美化演员列表
 * - 剔除头尾空格
 * - 剔除名字内空格（日本演员）
 *
 * @param {AVWork} av 未处理的 AV 对象
 * @returns {AVWork} 处理后的 AV 对象
 */
export function refineActress(av: AVWork): AVWork {
  av.actress = (av.actress as string[]).map((a) => {
    // 先剔除头尾空格
    let newA = a.trim()

    // 剔除内部空格（仅作用于非英文名演员、非素人演员）
    if (!newA.match(/[a-zA-Z]+/g) && !av.actressRealName) {
      newA = newA.replaceAll(/\s/g, '')
    }
    return newA
  })

  return av
}
