import { AVWork } from '@/typings'
import { finalCensored } from '@/utils/final'

// 厂商名转换列表
const MAKER_TRANS: { [name: string]: string } = {
  プレステージ: 'Prestige',
}

export default async function Prestige() {
  // 作品名
  const spanText = (document.querySelector('.min-h-main h1 span') as HTMLElement)?.innerText
  const workName: string = (document.querySelector('.min-h-main h1') as HTMLElement)?.innerText
    ?.replace(spanText, '')
    .trim()

  // 封面地址
  const imgList = document.querySelectorAll('img.swiper-picture')
  const imgUrl = ((imgList?.[1] || document.querySelector('img.swiper-picture')) as HTMLImageElement)?.src?.replace(
    /\?\S+/,
    ''
  )

  // 作品详情列表
  const infoList = [...document.querySelectorAll('.text-xl > .hidden > div.flex')]
  // 查找对应的详情
  function getInfo(key: string) {
    const infoItem = infoList?.find((info) => (info as HTMLElement)?.innerText?.includes(key))
    if (!infoItem) return

    const list = infoItem?.querySelectorAll('div.flex-1 a')?.length
      ? [...infoItem.querySelectorAll('div.flex-1 a')]
      : [...infoItem.querySelectorAll('div.flex-1 p')]
    const valueList = Array.from(list, (item) => (item as HTMLElement)?.innerText)
    return key === '出演者' ? valueList : valueList?.[0]
  }

  // 厂商名
  const makerValue: string = getInfo('メーカー') as string
  const makerName: string = MAKER_TRANS[makerValue as string] || makerValue

  // 系列名
  const seriesName: string = getInfo('シリーズ') as string

  // 日期
  const date: string = getInfo('発売日') as string

  // 番号
  const code: string = getInfo('品番') as string

  // 演员
  const actress: string[] = getInfo('出演者') as string[]

  let av: AVWork = {
    makerName,
    workName,
    seriesName,
    date,
    actress,
    code,
    imgUrl,
  }
  return { ...av, finalName: finalCensored(av, DIGIT_FIRST_SERIES, NO_End_SPACE_SERIES) }
}

// 编号在前的系列
const DIGIT_FIRST_SERIES: string[] = ['人妻さんいらっしゃい！', '職女。']

// 无需加尾空格的系列
const NO_End_SPACE_SERIES: string[] = ['人妻さんいらっしゃい！', '職女。']
