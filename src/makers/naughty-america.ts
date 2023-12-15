import { AVWork } from '@/typings'
import { firstLetterUppercase } from '@/utils/first-letter-uppercase'

export async function NA() {
  // 封面地址
  let imgUrl: string = `https:${
    (document.querySelector('.play-trailer > picture > source') as HTMLElement)?.dataset?.srcset
  }`.replace('webp', 'jpg')
  const res = await fetch(imgUrl)
  try {
    const blob = await res.blob()
    imgUrl = window.URL.createObjectURL(blob)
  } catch (e) {
    throw new Error(`[下载图片失败] ${e}`)
  }

  // 页面数据容器
  const sceneInfo = document.querySelector('.scene-info')

  // 作品名
  const workName: string = firstLetterUppercase((sceneInfo.querySelector('.scene-title') as HTMLElement)?.innerText)

  // 系列名
  const seriesName: string = firstLetterUppercase((sceneInfo.querySelector('.site-title') as HTMLElement)?.innerText)

  // 日期
  const date: string = new Date((sceneInfo.querySelector('.entry-date') as HTMLElement)?.innerText).toLocaleDateString(
    'zh-CN'
  )

  // 演员列表
  const actress: string[] = Array.from(sceneInfo.querySelectorAll('.performer-list > a'), (a) =>
    firstLetterUppercase((a as HTMLElement)?.innerText)
  )

  // 时长
  const duration = (sceneInfo.querySelector('.duration') as HTMLElement)?.innerText
    ?.match(/\d+\smin/)?.[0]
    .replace(' ', '')

  const labels = sceneInfo.querySelectorAll('.flag-bg')
  const resolutions: string[] = Array.from(labels, (label) =>
    (label as HTMLElement)?.innerText === 'HD' ? '1080p' : (label as HTMLElement)?.innerText
  )

  const av: AVWork = {
    makerName: 'Naughty America',
    workName,
    seriesName,
    date,
    actress,
    duration,
    resolutions,
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
  const finalName: string = `${av.seriesName}（${datify(av.date)}）${av.actress.join(', ')} - ${av.workName} [${
    av.duration
  }; ${av.resolutions?.join(', ')}]`

  return `【${av.makerName}】${finalName}.jpg`
}
