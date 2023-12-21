import { type AVWork } from '../../typings'

export async function OnePondo() {
  // 作品名
  const workName: string = (document.querySelector('.movie-overview h1') as HTMLElement).innerText

  // 展开信息列表
  const showInfo = document.querySelector('button.see-more') as HTMLElement
  await showInfo.click()

  // 作品详情列表
  const infoList = [...(document.querySelectorAll('.movie-detail > ul > li') || [])]
  /**
   * 从详情列表中查找返回对应信息
   */
  function getInfo(key: string) {
    const infoItem = infoList?.find((info) => (info as HTMLElement)?.innerText?.includes(key))
    return (infoItem?.querySelector('span:last-child') as HTMLElement)?.innerText || ''
  }

  // 系列名
  const seriesName: string = getInfo('シリーズ') || ''

  // 日期
  const date: string = getInfo('配信日') || ''

  // 演员列表
  const actress: string[] = getInfo('出演')?.trim()?.split(/\s/) || []

  // 番号
  const code: string = document.URL?.match(/\d+_\d+/)?.[0] || ''

  // 封面地址
  const imgUrl: string = `https://www.1pondo.tv/assets/sample/${code}/str.jpg`

  // 时长
  const duration: string = getInfo('再生時間')?.replaceAll(':', '.') || ''

  const av: AVWork = {
    makerName: '1 Pondo',
    workName,
    seriesName,
    date,
    actress,
    code,
    imgUrl,
    duration,
  }
  return { ...av, finalName: final(av) }
}

import { datify } from '@/utils/datify'
import { codify } from '@/utils/codify'
import { refineTitle } from '@/utils/refine-title'
import { refineActress } from '@/utils/refine-actress'
import { checkIndicator } from '@/utils/check-indicator'
import { checkDigit } from '@/utils/check-digit'

// 序号优先的系列
const DIGIT_FIRST_SERIES: string[] = []

/**
 * 拼接最终文件名
 */
function final(av: AVWork) {
  let finalName: string

  /* === 1. 处理演员名 === */
  av = refineActress(av)

  /* === 2. 处理标题 === */
  av = refineTitle(av)

  /* === 3. 处理系列名 === */
  if (av && av.seriesName) {
    /* 系列作品 */
    av.seriesName = av.seriesName.trim()

    const numType1 = checkIndicator(av.workName) // 标识 + 编号
    const numType2 = checkDigit(av.workName, av.seriesName) // 纯数字编号

    if (numType1 || (!numType1 && numType2)) {
      /* 包含编号标识 || 不包含编号标识但包含纯数字 */
      const digitFirstSeries = DIGIT_FIRST_SERIES.find((x) => av.seriesName === x)

      if (digitFirstSeries) {
        // 系列编号在前：【厂商】系列名 编号（日期）演员名（番号）[时长]
        finalName = `${av.seriesName} ${numType1 || numType2}（${datify(av.date)}）${av.actress}（${av.code}）[${
          av.duration
        }]`
      } else {
        // 系列编号在后：【厂商】系列名（日期）编号（番号）演员名 [时长]
        finalName = `${av.seriesName}（${datify(av.date)}）${numType1 || numType2}（${av.code}）${av.actress} [${
          av.duration
        }]`
      }
    } else {
      /* 不含编号标识：【厂商】系列名（日期）演员名（番号）[时长] */
      finalName = `${av.seriesName}（${datify(av.date)}）${av.actress}（${av.code}）[${av.duration}]`
    }
  } else {
    /* 非系列作品：【厂商】（日期）演员（番号）作品名 [时长] */
    finalName = `（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.workName} [${av.duration}]`
  }

  return `【${av.makerName}】${finalName}.jpg`
}
