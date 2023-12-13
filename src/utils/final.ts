import { datify } from './datify'
import { codify } from './codify'
import { refineTitle } from './refine-title'
import { refineActress } from './refine-actress'
import { checkIndicator } from './check-indicator'
import { checkDigit } from './check-digit'
import { AVWork } from '../typings'

/* 编号在前的系列 */
const DIGIT_FIRST_SERIES = [
  // ===== 无码 =====
  // 加勒比
  '新入社員のお仕事',

  // ===== 有码 =====
  // Prestige
  '職女。',

  // ===== 欧美 =====

  // ===== 素人 =====
  'ラグジュTV',
]

/**
 * 根据传入的 AV 对象，拼接最后文件名
 * @param {AVWork} avObj
 * @returns {string} 拼接的最终文件名
 */
export default async function final(avObj: AVWork): Promise<string> {
  // 深拷贝
  let av: AVWork = JSON.parse(JSON.stringify(avObj))
  let finalName: string

  /* ========== 日本作品，有番号 ========== */
  if (av.code) {
    /* === 1. 处理演员名 === */
    av = refineActress(av)

    /* === 2. 处理标题 === */
    av = refineTitle(av)

    /* === 3. 处理系列名 === */
    if (av && av.seriesName) {
      av.seriesName = av.seriesName.trim()

      const numType1 = checkIndicator(av.workName) // 是否包含编号标识
      const numType2 = checkDigit(av.workName, av.seriesName) // 是否包含纯数字

      if (numType1 || (!numType1 && numType2)) {
        /**
         * 包含编号标识 / 不包含编号标识但包含纯数字
         */
        const digitFirstSeries = DIGIT_FIRST_SERIES.find((x) => av.seriesName === x)

        if (digitFirstSeries) {
          /**
           * 系列编号在前
           * 格式：<编号>（<日期>）
           */
          finalName = ` ${numType1 || numType2}（${datify(av.date)}）`
        } else {
          /**
           * 系列编号在后
           * 格式：（<日期>）<编号>
           */
          finalName = `（${datify(av.date)}）${numType1 || numType2} `
        }

        /* tempName + <演员>（<番号>）[<素人演员真实姓名>] */
        finalName = `${finalName}${av.actress}（${av.code}）${av.actressRealName || ''}`
      } else {
        /**
         * 不含编号
         * 格式：系列名（日期）演员名（番号）
         */
        finalName = `（${datify(av.date)}）${av.actress}（${av.code}）`
      }

      finalName = `${av.seriesName}${finalName}`
    } else {
      /**
       * 非系列作品
       * 格式：（日期）演员（番号）作品名
       */
      finalName = `（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.workName}`
    }

    finalName = `【${av.makerName}】${finalName}${
      av.duration ? (av.resolution ? `[${av.duration}; ${av.resolution}]` : `[${av.duration}]`) : ''
    }.jpg`
    return finalName
  }

  /* ========== 欧美作品，无番号 ========== */
  // 替换半角冒号
  av.workName = av.workName?.replace(': ', '-')
  const newActress = []
  for (const a of av.actress) {
    newActress.push(a.toLowerCase().replace(/\b(\w)|\s(\w)/g, (s) => s.toUpperCase()))
  }

  finalName = `【${av.makerName}】${av.seriesName || ''}（${datify(av.date)}）${newActress.join(
    ', '
  )} - ${av.workName}${av.duration ? `[${av.duration}; ${av.resolution.join(', ')}]` : ''}.jpg`
  return finalName
}
