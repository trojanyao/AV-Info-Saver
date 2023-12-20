import { type AVWork } from '../typings'

export default async function Caribbean() {
  // 封面地址
  const bgImg: string = (document.querySelector('.vjs-poster') as HTMLElement)?.style?.backgroundImage
  const imgUrl: string = `https://www.caribbeancom.com${bgImg.match(/"\S+"/)?.[0]?.replaceAll('"', '')}`

  // 作品名
  const workName = (document.querySelector('.heading > h1') as HTMLElement)?.innerText

  // 页面数据列表
  let infoList = Array.from(document.querySelectorAll('.movie-info > ul > li'))
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
  const code: string = document.URL?.match(/\d{6}-\d{3}/g)?.[0] || ''

  // 时长
  const duration: string = getInfo('再生時間')?.replaceAll(':', '.') || ''

  const av: AVWork = {
    makerName: '加勒比',
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
const DIGIT_FIRST_SERIES: string[] = ['新入社員のお仕事']

/**
 * 拼接最终文件名
 */
function final(av: AVWork) {
  let finalName: string

  /* === 1. 处理演员名 === */
  av = refineActress(av)
  const actressString = av.actress.join(' ')

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
        finalName = `${av.seriesName} ${numType1 || numType2}（${datify(av.date)}）${actressString}（${av.code}）[${
          av.duration
        }]`
      } else {
        // 系列编号在后：【厂商】系列名（日期）编号（番号）演员名 [时长]
        finalName = `${av.seriesName}（${datify(av.date)}）${numType1 || numType2}（${av.code}）${actressString} [${
          av.duration
        }]`
      }
    } else {
      /* 不含编号标识：【厂商】系列名（日期）演员名（番号）[时长] */
      finalName = `${av.seriesName}（${datify(av.date)}）${actressString}（${av.code}）[${av.duration}]`
    }
  } else {
    /* 非系列作品：【厂商】（日期）演员（番号）作品名 [时长] */
    finalName = `（${datify(av.date)}）${actressString}（${codify(av.code)}）${av.workName} [${av.duration}]`
  }

  return `【${av.makerName}】${finalName}.jpg`
}
