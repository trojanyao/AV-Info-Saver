interface InfoKeyList {
  seriesKey?: string
  dateKey?: string
  actressKey?: string
  codeKey?: string
  durationKey?: string
}

const DEFAULT_KEY_LIST = {
  seriesKey: 'シリーズ',
  dateKey: '発売日',
  actressKey: '女優',
  codeKey: '品番',
}

/**
 * 从详情列表中查找返回对应信息
 * @param {Array<any>} infoList 作品信息列表
 * @param {string} selector 列表项下信息值对应的 CSS 选择器
 * @param {InfoKeyList} keyList 查询的信息键列表
 */
export function getInfo(infoList: Array<any>, selector: string, keyList: InfoKeyList = DEFAULT_KEY_LIST) {
  keyList = { ...DEFAULT_KEY_LIST, ...keyList }

  function getValue(key: string) {
    if (!key) {
      return
    }

    const infoItem = infoList?.find((info) => (info as HTMLElement)?.innerText?.includes(key))
    return Array.from(infoItem?.querySelectorAll(selector), (item) => (item as HTMLElement)?.innerText || '')
  }

  return {
    seriesName: getValue(keyList.seriesKey)?.[0],
    date: getValue(keyList.dateKey)?.[0],
    actress: getValue(keyList.actressKey),
    code: getValue(keyList.codeKey)?.[0]?.replace('DVD', ''),
    duration: getValue(keyList.durationKey)?.[0],
  }
}
