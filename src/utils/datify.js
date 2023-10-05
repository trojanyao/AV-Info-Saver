// 発売日 标准化
export function datify(date) {
  let newDate;
  // console.log('传入的日期', date)
  if (/\d{4}\.\d{2}\.\d{2}/.test(date)) {
    // console.log('1')
    newDate = date;
  } else if (/\d+\/\d+\/\d+/.test(date)) {
    // console.log('2')
    newDate = new Date(date)
      .toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" })
      .replaceAll("/", ".");
  } else {
    // console.log('3')
    let year = date.match(/(\d{4})年/)[1];
    let month = date.match(/(\d{1,2})月/)[1];
    let day = date.match(/(\d{1,2})日/)[1];
    newDate = `${year}.${month.length === 1 ? "0" + month : month}.${
      day.length === 1 ? "0" + day : day
    }`;
  }
  return newDate;
}
