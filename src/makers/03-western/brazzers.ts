import { AVWork } from '@/typings'

export default async function Brazzers() {
  // 信息容器
  const infoDiv = document.querySelector(
    '#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div > div > section > div > div'
  )

  // 作品名
  const workName: string = (infoDiv?.querySelector('h2.font-secondary') as HTMLElement)?.innerText

  // 日期
  const date: string = new Date((infoDiv?.querySelectorAll('div')?.[0] as HTMLElement)?.innerText).toLocaleDateString(
    'zh-CN'
  )

  // 演员列表
  const actress: string[] = (infoDiv?.querySelectorAll('div')?.[1] as HTMLElement)?.innerText?.split(', ') || []

  // 封面地址
  let imgUrl = ((document.querySelector('video + div') as HTMLElement).style as any)['background-image']
  imgUrl = imgUrl.match(/"(\S+)"/)?.[1]
  // 跨域获取
  const res = await fetch(imgUrl)
  const blob = await res.blob()
  imgUrl = window.URL.createObjectURL(blob)

  const av: AVWork = {
    makerName: 'Brazzers',
    workName,
    seriesName: '系列名待补充',
    date,
    actress,
    imgUrl,
  }
  return { ...av, finalName: final(av) }
}

import { datify } from '@/utils/datify'

/**
 * 拼接最终文件名
 */
function final(av: AVWork) {
  //【厂商】（日期）演员 - 作品名
  av.seriesName = av.seriesName.trim()
  const finalName: string = `${av.seriesName}（${datify(av.date)}）${av.actress.join(', ')} - ${av.workName}`

  return `【${av.makerName}】${finalName}.jpg`
}
