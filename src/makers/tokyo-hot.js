// 厂商名转换列表
const seriesList = [
    'Wカン',
    '東熱激情 淫乱女教師中出授業 特集',
]

export default async function TokyoHot(url) {
    // 定义页面元素
    let makerName, workName, seriesName, date, actress = [], code, imgUrl, duration
    // 仅在作品页生效
    if (url.includes('https://my.tokyo-hot.com/product/')) {
        // 作品信息列表
        let keyList = document.querySelectorAll('dl.info > dt')
        let infoList = document.querySelectorAll('dl.info > dd')
        // keyList 是 NodeList，不是数组，先转换为数组，再取出其值
        keyList = Array.from(keyList)
        console.log('数据列表', infoList)

        // 作品名
        workName = document.querySelector('.contents > h2').innerText
        console.log('作品名', workName)

        // 系列名
        for (let series of seriesList) {
            let reg = new RegExp(series, 'g')
            if (reg.test(workName)) {
                console.log('系列名', series)
                seriesName = series
                break
            }
        }

        // 日期
        let dateIndex = keyList.findIndex(key => key.innerText.includes('配信開始日'))
        date = infoList[dateIndex].innerText
        console.log('日期索引', dateIndex, '日期', date)

        // 演员列表
        let aList = infoList[0].querySelectorAll('a')
        aList.forEach(a => actress.push(a.innerText.trim()))
        console.log('演员列表', aList, actress)

        // 番号
        let codeIndex = keyList.findIndex(key => key.innerText.includes('作品番号'))
        code = infoList[codeIndex].innerText
        console.log('番号', codeIndex, code)

        // 封面地址
        let pdNum = url.match(/n\d+/g)?.[0] || url.match(/\d+/g)?.[0]
        imgUrl = `https://my.cdn.tokyo-hot.com/media/${pdNum}/jacket/${code}.jpg`
        console.log('封面原始地址', imgUrl)
        const res = await fetch(imgUrl)
        try {
            const blob = await res.blob()
            imgUrl = window.URL.createObjectURL(blob)
        } catch (e) {
        }


        // 时长
        let durIndex = keyList.findIndex(key => key.innerText.includes('収録時間'))
        duration = infoList[durIndex].innerText.replaceAll(':', '.')
        console.log('时长', durIndex, duration)

        let av = {
            makerName: '東京熱',
            workName: workName,
            seriesName: seriesName,
            date: date,
            actress: actress,
            code: code,
            imgUrl: imgUrl,
            duration: duration,
        }
        console.log('TokyoHot AV 对象', av)
        return av
    }
}