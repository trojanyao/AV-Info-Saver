/**
 * 将不同格式的発売日标准化为统一格式
 * YYYY.MM.DD
 *
 * @param {string} date 未处理的日期字符串
 * @returns {string} 处理后的标准日期格式
 */
export function datify(date: string): string {
  let newDate

  // 符合标准格式：直接返回
  if (/\d{4}\.\d{2}\.\d{2}/.test(date)) {
    newDate = date
    return newDate
  }

  // 使用 “/” 作为分隔符的格式
  if (/\d+\/\d+\/\d+/.test(date)) {
    newDate = new Date(date)
      .toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .replaceAll('/', '.')
    return newDate
  }

  // 含有汉字的格式
  let year = date.match(/(\d{4})年/)[1]
  let month = date.match(/(\d{1,2})月/)[1]
  let day = date.match(/(\d{1,2})日/)[1]
  newDate = `${year}.${month.length === 1 ? '0' + month : month}.${day.length === 1 ? '0' + day : day}`
  return newDate
}
