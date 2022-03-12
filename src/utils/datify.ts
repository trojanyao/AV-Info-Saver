// 発売日 标准化
export function datify(date: string) {
    if (/\d{4}\.\d{2}\.\d{2}/.test(date)) {
        return date
    } else {
        let year = date.match(/(\d{4})年/)[1];
        let month = date.match(/(\d{1,2})月/)[1];
        let day = date.match(/(\d{1,2})日/)[1];
        return `${year}.${month.length === 1 ? '0' + month : month}.${day.length === 1 ? '0' + day : day}`;
    }
}