declare module '*.less'

export interface AVWork {
  makerName: string // 厂商名
  workName: string // 作品名
  seriesName?: string // 系列名
  date: string // 发布日期
  actress: string[] // 演员列表
  actressRealName?: string // 素人女优的真实姓名
  code?: string // 番号
  imgUrl: string // 封面图片地址
  duration?: string // 时长
  resolutions?: string[] // 清晰度
}
