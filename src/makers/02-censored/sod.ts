import { getInfo } from '@/utils/get-info'
import { finalCensored } from '@/utils/final'
import { AVWork } from '@/typings'

export default async function SOD() {
  // 作品名
  const workName: string = (document.querySelector('#videos_head > h1 + h1') as HTMLInputElement).innerText

  // 封面地址
  let imgUrl: string = (document.querySelector('.videos_samimg > a') as HTMLBaseElement)?.href?.replace(
    'http:',
    'https:'
  )
  // 跨域获取
  try {
    const res = await fetch(imgUrl)
    const blob = await res.blob()
    imgUrl = window.URL.createObjectURL(blob)
  } catch (e) {
    throw new Error(`[下载图片失败] ${e}`)
  }

  // 页面数据列表
  const infoList = [...document.querySelectorAll('#v_introduction tr')]

  const tempAV = getInfo(infoList, '.v_intr_tx', { dateKey: '発売年月日', actressKey: '出演者' }, '.v_intr_tx a')

  const av = {
    makerName: 'SODクリエイト',
    workName,
    imgUrl,
    ...tempAV,
  }
  return { ...av, finalName: final(av) }
}

// 系列字段中不是系列的名称
const NotRealSeries = ['おねだりプリン']
// 处理系列名
function refineSeries(seriesName: string) {
  const subList = NotRealSeries.filter((x) => x?.includes(seriesName) || seriesName.includes(x))

  let newSeriesName = seriesName
  subList.forEach((item: string) => {
    newSeriesName = newSeriesName?.replace(item, '')
  })
  return newSeriesName
}

function final(av: AVWork) {
  av.seriesName = refineSeries(av.seriesName)
  return finalCensored(av)
}
