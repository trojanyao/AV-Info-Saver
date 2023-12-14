import { type AVWork } from '@/typings'

export default async function MGS() {
  // 作品名
  const workName: string = (document.querySelector('.common_detail_cover h1') as HTMLElement)?.innerText

  // 封面地址
  let imgUrl: string = (document.querySelector('.detail_data h2 img') as HTMLImageElement)?.src?.replace(
    /\w{2}_\w{1,2}_/,
    'pb_e_'
  )

  const res = await fetch(imgUrl)
  try {
    const blob = await res.blob()
    imgUrl = window.URL.createObjectURL(blob)
  } catch (e) {
    throw new Error(`[下载图片失败] ${e}`)
  }

  // 作品详情列表
  const infoList = [...document.querySelectorAll('.detail_data > table:last-child > tbody > tr')]
  /**
   * 从详情列表中查找返回对应信息
   */
  function getInfo(key: string) {
    const infoItem = infoList.find((info) => (info?.querySelector('th') as HTMLElement)?.innerText?.includes(key))

    let info: string = ''
    if (infoItem) {
      if (key === '出演') {
        /**
         * 演员名有链接：取 <a> 标签
         * 演员名无链接：取 <td> 标签
         */
        const hasLink = infoItem?.querySelectorAll('td > a')?.length
        info = Array.from(hasLink ? infoItem?.querySelectorAll('td > a') : infoItem?.querySelectorAll('td'), (a) =>
          (a as HTMLElement)?.innerText?.trim()
        )?.join(', ')
      } else {
        info = infoItem?.querySelector('td')?.innerText
      }
    }
    return info
  }

  // 厂商名
  const makerName: string = getInfo('メーカー')

  // 系列名
  const seriesName: string = getInfo('シリーズ')

  // 日期
  const date: string = getInfo('配信開始日')

  // 演员列表
  const actress: string[] = getInfo('出演')?.split(', ')

  // 番号
  const code: string = getInfo('品番')

  // 时长
  const duration: string = getInfo('収録時間')

  const av = {
    workName,
    imgUrl,
    makerName,
    seriesName,
    date,
    actress,
    actressRealName: 'xxx',
    code,
    duration,
  }
  return { ...av, finalName: final(av) }
}

import { datify } from '@/utils/datify'
import { codify } from '@/utils/codify'
import { refineTitle } from '@/utils/refine-title'
// import { refineActress } from '@/utils/refine-actress'
import { checkIndicator } from '@/utils/check-indicator'
import { checkDigit } from '@/utils/check-digit'

// 序号优先的系列
const DIGIT_FIRST_SERIES: string[] = ['ラグジュTV', 'マジ軟派、初撮。', '働くドMさん.']

// 厂商名转换列表
const MAKER_TRANS: { [name: string]: string } = {
  'プレステージプレミアム(PRESTIGE PREMIUM)': 'Prestige Premium',
}

/**
 * 是否需要移除系列名后的空格
 */
function seriesEndSpace(name: string) {
  const noEndSpaceSeries = ['マジ軟派、初撮。']
  return noEndSpaceSeries?.includes(name) ? '' : ' '
}

/**
 * 拼接最终文件名
 */
function final(av: AVWork) {
  let finalName: string

  /* === 1. 处理演员名 === */
  // av = refineActress(av)
  const actressString = av.actress.join(', ')

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
        // 系列编号在前：【厂商】系列名 编号（日期）演员名（番号）素人女优真实姓名 [时长]
        finalName = `${av.seriesName}${seriesEndSpace(av?.seriesName)}${numType1 || numType2}（${datify(
          av.date
        )}）${actressString}（${av.code}）${av.actressRealName} [${av.duration}]`
      } else {
        // 系列编号在后：【厂商】系列名（日期）编号（番号）演员名（素人女优真实姓名）[时长]
        finalName = `${av.seriesName}（${datify(av.date)}）${numType1 || numType2}（${av.code}）${actressString}（${
          av.actressRealName
        }）[${av.duration}]`
      }
    } else {
      /* 不含编号标识：【厂商】系列名（日期）演员名（番号）素人女优真实姓名 [时长] */
      finalName = `${av.seriesName}（${datify(av.date)}）${actressString}（${av.code}）${av.actressRealName} [${
        av.duration
      }]`
    }
  } else {
    /* 非系列作品：【厂商】（日期）演员（番号）作品名（素人女优真实姓名）[时长] */
    finalName = `（${datify(av.date)}）${actressString}（${codify(av.code)}）${av.workName}（${av.actressRealName}）[${
      av.duration
    }]`
  }

  return `【${MAKER_TRANS?.[av.makerName] || av.makerName}】${finalName}.jpg`.replaceAll('/', '-')
}
