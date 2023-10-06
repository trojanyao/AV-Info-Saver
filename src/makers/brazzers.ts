import { AVWork } from '../typings'

export default async function Brazzers(url: string) {
  // 定义页面元素
  let workName,
    seriesName,
    date,
    actress: string[] = [],
    code,
    imgUrl

  // 仅在作品页生效
  if (!url.includes('https://www.brazzers.com/video/')) {
    return
  }

  /* === 页面数据列表 === */
  let info = document.querySelector(
    '#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div'
  )

  /* === 作品名 === */
  workName = info.querySelector('h2').innerText

  // 系列名
  // seriesName =
  // console.log('系列名', seriesName)

  /* === 日期 === */
  date = new Date(
    (document.querySelector('h2').previousElementSibling as HTMLElement).innerText
  ).toLocaleDateString('zh-CN')

  /* === 演员列表 === */
  let aList = document.querySelectorAll('h2 + div > span')
  aList.forEach((a) => actress.push((a as HTMLElement).innerText.replace(', ', '')))

  /* === 封面地址 === */
  imgUrl = ((document.querySelector('video + div') as HTMLElement).style as any)['background-image']
  imgUrl = imgUrl.match(/"(\S+)"/)?.[1]
  // 跨域获取
  const res = await fetch(imgUrl)
  const blob = await res.blob()
  imgUrl = window.URL.createObjectURL(blob)

  const av: AVWork = {
    makerName: 'Brazzers',
    workName,
    seriesName,
    date,
    actress,
    code,
    imgUrl,
  }
  return av
}
