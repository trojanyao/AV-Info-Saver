export default async function Maker(url) {
    // 定义页面元素
    let workName, seriesName, date, actress = [], code, imgUrl, duration, resolution
    // 仅在作品页生效
    if (url.includes('')) {
        // 页面数据列表
        // let infoList = document.querySelectorAll('dl.info > dd')
        // let keyList = document.querySelectorAll('dl.info > dt')
        // keyList 是 NodeList，不是数组，先转换为数组，再取出其值
        // keyList = Array.from(keyList)
        console.log('数据列表', infoList)

        // 作品名
        // workName = 
        console.log('作品名', workName)

        // 系列名
        // seriesName = 
        console.log('系列名', seriesName)

        // 日期
        // date = 
        console.log('日期', date)

        // 演员列表
        // let aList = infoList.querySelectorAll('.performer-list > a')
        // aList.forEach(a => actress.push(a.innerText))
        console.log('演员列表', actress)

        // 番号
        // code = 
        // code = codify(code)
        console.log('番号', code)

        // 封面地址
        imgUrl =
            // 跨域获取
            // const res = await fetch(imgUrl)
            // try {
            //     const blob = await res.blob()
            //     imgUrl = window.URL.createObjectURL(blob)
            // } catch (e) {
            //     console.log('下载图片失败', e)
            // }

            // 时长
            // duration = 
            console.log('时长', duration)

        // 清晰度和大小
        // resolution = 
        console.log('清晰度', resolution)
        console.log('大小', '格式',)

        let av = {
            makerName: '',
            workName: workName,
            seriesName: seriesName,
            date: date,
            actress: actress,
            code: code,
            imgUrl: imgUrl,
            duration: duration,
            resolution: resolution,
        }
        console.log('传出 AV 对象', av)
        return av
    }
}