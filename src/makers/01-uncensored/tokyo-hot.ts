/**
 * 手动维护系列列表，从作品名中识别
 */

import { AVWork } from '@/typings'
import { finalUncensored } from '@/utils/final'

// 系列列表
const seriesList = ['鬼逝', 'Wカン', '東熱激情 淫乱女教師中出授業 特集', '東熱激情 密着パンスト24時！特集']
function getSeriesName(workName: string) {
  return seriesList?.find((item) => workName?.includes(item))
}

export default async function TokyoHot() {
  // 作品名
  const workName: string = (document.querySelector('.contents > h2') as HTMLElement)?.innerText

  // 封面地址
  let imgUrl: string = document.querySelector('video')?.poster
  try {
    const res = await fetch(imgUrl)
    const blob = await res.blob()
    imgUrl = window.URL.createObjectURL(blob)
  } catch (e) {
    throw new Error(`[下载图片失败] ${e}`)
  }

  // 系列名
  const seriesName: string = getSeriesName(workName)

  // 作品信息列表
  const keyList = [...document.querySelectorAll('dl.info > dt')]
  function getInfo(key: string) {
    const keyItem = keyList?.find((item) => (item as HTMLElement)?.innerText?.includes(key))
    if (!keyItem) return

    const valueItem = keyItem?.nextElementSibling
    if (!valueItem) return

    return key === '出演者'
      ? Array.from(valueItem?.querySelectorAll('a'), (x) => x?.innerText)
      : [(valueItem as HTMLElement)?.innerText]
  }

  // 日期
  const date: string = getInfo('配信開始日')?.[0]

  // 演员
  const actress: string[] = getInfo('出演者')

  // 番号
  const code: string = getInfo('作品番号')?.[0]

  // 时长
  const duration: string = getInfo('収録時間')?.[0]?.replaceAll(':', '.')

  // 清晰度和大小
  const sizeList = document.querySelectorAll('.download')?.[1].querySelectorAll('.dbox')
  let resolutions: string[] = []
  sizeList.forEach((sizeItem) => {
    const format = sizeItem.querySelector('h4').innerText.match(/MP4|WMV/g)?.[0]
    const size = sizeItem.querySelector('h4').innerText.match(/\d+.\d+/g)?.[0]
    const resolution = sizeItem.querySelector('p').innerText.match(/x(\d+)/)?.[1]

    if (parseInt(resolution) >= 720) {
      resolutions.push(`${parseFloat(size).toFixed(1)}GB-${format}-${resolution}p`)
    }
  })

  const av: AVWork = {
    makerName: '東京熱',
    workName,
    seriesName,
    date,
    actress,
    code,
    imgUrl,
    duration,
    resolutions,
  }
  return { ...av, finalName: finalUncensored(av) }
}
