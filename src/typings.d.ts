declare module "*.less"

export interface AVWork {
  makerName: string // 厂商名
  workName: string // 作品名
  seriesName?: string // 系列名
  date: string // 发布日期
  actress: string | string[] // 女优
  actressRealName?: string // 素人女优的真实姓名
  code: string // 番号
  imgUrl: string // 封面图片地址
  duration?: string // 时长
  resolution?: string[] // 清晰度
}
