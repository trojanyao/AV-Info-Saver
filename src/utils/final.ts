import { datify } from './datify'
import { codify } from './codify'
import { refineTitle } from './refine-title'
import { refineActress } from './refine-actress'
import { checkIndicator } from './check-indicator'
import { checkDigit } from './check-digit'
import { AVWork } from '../typings'

/**
 * 是否需要移除系列名后的空格
 * @param list 需要移除的系列列表
 * @param seriesName 当前作品系列名
 */
function seriesEndSpace(list: string[], seriesName: string) {
  return list?.includes(seriesName) ? '' : ' '
}

/**
 * 拼接最终文件名（无码）
 */
export function finalUncensored(av: AVWork, DIGIT_FIRST_SERIES: string[] = []) {
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
        finalName = `${av.seriesName} ${numType1 || numType2}（${datify(av.date)}）${actressString}（${av.code}）`
      } else {
        // 系列编号在后：【厂商】系列名（日期）编号（番号）演员名 [时长]
        finalName = `${av.seriesName}（${datify(av.date)}）${numType1 || numType2}（${av.code}）${actressString} `
      }
    } else {
      /* 不含编号标识：【厂商】系列名（日期）演员名（番号）[时长] */
      finalName = `${av.seriesName}（${datify(av.date)}）${actressString}（${av.code}）`
    }
  } else {
    /* 非系列作品：【厂商】（日期）演员（番号）作品名 [时长] */
    finalName = `（${datify(av.date)}）${actressString}（${codify(av.code)}）${av.workName} `
  }

  return `【${av.makerName}】${finalName}[${av.duration}${
    av?.resolutions ? `; ${av?.resolutions?.join(', ')}` : ''
  }].jpg`
}

/**
 * 拼接最终文件名（有码）
 */
export function finalCensored(av: AVWork, digitFirstSeriesList: string[] = [], noSeriesEndSpaceList: string[] = []) {
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
      const digitFirstSeries = digitFirstSeriesList.find((x) => av.seriesName === x)

      if (digitFirstSeries) {
        // 系列编号在前：【厂商】系列名 编号（日期）演员名（番号）[时长]
        finalName = `${av.seriesName}${seriesEndSpace(noSeriesEndSpaceList, av?.seriesName)}${
          numType1 || numType2
        }（${datify(av.date)}）${actressString}（${av.code}）`
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
