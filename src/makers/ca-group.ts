import { getInfo } from '@/utils/get-info'
import { type AVWork } from '@/typings'

/**
 * 根据域名判断厂商名
 * @returns
 */
function getMakerName() {
  const host: string = window.location.host
  let makerName: string = ''

  switch (host) {
    case 'attackers.net':
      makerName = 'Attackers'
      break
    case 'ideapocket.com':
      makerName = 'Idea Pocket'
      break
    case 'madonna-av.com':
      makerName = 'Madonna'
      break
    case 'moodyz.com':
      makerName = 'MOODYZ'
      break
    case 'premium-beauty.com':
      makerName = 'Premium'
      break
    case 's1s1s1.com':
      makerName = 'S1'
      break
    case 'honnaka.jp':
      makerName = '本中'
      break
    case 'mvg.jp':
      makerName = 'MVG'
      break
  }

  return makerName
}

export default async function CA() {
  // 厂商名
  const makerName = getMakerName()

  // 封面地址
  const swiperSlide = document.querySelectorAll('.p-slider img')
  const img = (swiperSlide?.[1] || swiperSlide?.[0]) as HTMLImageElement
  let imgUrl: string = img?.src || img?.dataset?.src
  // 跨域获取
  const res = await fetch(imgUrl)
  try {
    const blob = await res.blob()
    imgUrl = window.URL.createObjectURL(blob)
  } catch (e) {
    throw new Error(`[下载图片失败] ${e}`)
  }

  // 作品名
  const workName: string = (document.querySelector('h2.p-workPage__title') as HTMLElement)?.innerText

  // 页面数据列表
  let infoList = [...document.querySelectorAll('.p-workPage__table > .item')]

  const tempAV = getInfo(infoList, '.item')

  const av: AVWork = {
    makerName,
    workName,
    imgUrl,
    ...tempAV,
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
  const actressString = av.actress.join(' ')

  /* === 2. 处理标题 === */
  av = refineTitle(av)

  /* === 3. 处理番号 === */
  av.code = codify(av.code)

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
        finalName = `${av.seriesName} ${numType1 || numType2}（${datify(av.date)}）${actressString}（${av.code}`
      } else {
        // 系列编号在后：【厂商】系列名（日期）编号（番号）演员名 [时长]
        finalName = `${av.seriesName}（${datify(av.date)}）${numType1 || numType2}（${av.code}）${actressString}`
      }
    } else {
      /* 不含编号标识：【厂商】系列名（日期）演员名（番号）[时长] */
      finalName = `${av.seriesName}（${datify(av.date)}）${actressString}（${av.code}）`
    }
  } else {
    /* 非系列作品：【厂商】（日期）演员（番号）作品名 [时长] */
    finalName = `（${datify(av.date)}）${actressString}（${codify(av.code)}）${av.workName}`
  }

  return `【${av.makerName}】${finalName}.jpg`
}
