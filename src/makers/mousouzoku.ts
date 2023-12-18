import { type AVWork } from '@/typings'

// 官网没有系列字段，从作品名中识别
const series = ['OLスーツ倶楽部']

export default async function Mousouzoku() {
  // 作品名
  const workName: string = (document.querySelector('h1.ttl-works') as HTMLElement)?.innerText

  // 封面地址
  const imgUrl: string = (document.querySelector('.tmb-img') as HTMLBaseElement)?.href

  // 页面数据列表
  let infoWrap = document.querySelector('dl.bx-info')

  /**
   * 根据属性名查找对应的属性值
   */
  function getInfo(key: string) {
    const infoKey = [...infoWrap.querySelectorAll('dt')]?.find((item) =>
      (item as HTMLElement)?.innerText?.includes(key)
    )
    if (!infoKey) return

    const valueList = Array.from(
      infoKey?.nextElementSibling?.querySelectorAll('p'),
      (x) => (x as HTMLElement)?.innerText
    )

    return valueList?.length > 1 || key === '出演者' ? valueList : valueList?.[0]
  }

  // 厂商名
  const makerName: string = getInfo('メーカー') as string

  // 系列名
  const seriesName: string = series?.find(x => workName?.includes(x))

  // 日期
  const date: string = getInfo('発売日') as string

  // 演员列表
  const actress = getInfo('出演者') as string[]

  // 番号
  const code: string = getInfo('品番') as string

  const av: AVWork = {
    makerName,
    workName,
    seriesName,
    date,
    actress,
    code,
    imgUrl,
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

  /* === 处理厂商名 === */
  av.makerName = av.makerName.replace('/', '·') // 替换子厂商后的左斜杠

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
        finalName = `${av.seriesName} ${numType1 || numType2}（${datify(av.date)}）${actressString}（${av.code}）`
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
