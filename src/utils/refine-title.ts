import { AVWork } from '../typings'

/**
 * 删除作品标题头尾包含的演员名
 * 
 * @param {AVWork} av 未处理的 AV 对象
 * @returns {AVWork} 处理后的 AV 对象
 */
export function refineTitle(av: AVWork) {
  // 去头尾演员名
  let startAct = new RegExp('^' + av.actress, 'g')
  let endAct = new RegExp(av.actress + '$', 'g')
  let titleHasActress = startAct.test(av.workName) || endAct.test(av.workName)

  // 替换斜线
  av.workName = av.workName.replaceAll('/', ' ')

  if (titleHasActress) {
    av.workName = av.workName.replace(av.actress as string, '')
  }
  // 头尾去空格
  av.workName = av.workName.trim()
  return av
}
