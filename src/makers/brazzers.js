export default async function Brazzers(url) {
    // 定义页面元素
    let workName, seriesName, date, actress = [], code, imgUrl, duration, resolution
    console.log('传入的链接', url, '页面状态', document.readyState)
    // setTimeout(async () => {
    // 仅在作品页生效
    if (url.includes('https://www.brazzers.com/video/')) {
        // 页面数据列表
        let info = document.querySelector('#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div')
        // let keyList = document.querySelectorAll('dl.info > dt')
        // keyList 是 NodeList，不是数组，先转换为数组，再取出其值
        // keyList = Array.from(keyList)
        console.log('数据区域', info)

        // 作品名
        workName = info.querySelector('h2').innerText
        console.log('作品名', workName)

        // 系列名
        // seriesName = 
        // console.log('系列名', seriesName)

        // 日期
        date = new Date(document.querySelector('h2').previousElementSibling.innerText).toLocaleDateString('zh-CN')
        console.log('日期', date)

        // 演员列表
        let aList = document.querySelectorAll('h2 + div > span')
        aList.forEach(a => actress.push(a.innerText.replace(', ', '')))
        console.log('演员列表', actress)

        // 番号
        // code = 
        // code = codify(code)
        console.log('番号', code)

        // 封面地址
        imgUrl = document.querySelector('video + div').style['background-image']
        imgUrl = imgUrl.match(/"(\S+)"/)?.[1]
        // 跨域获取
        const res = await fetch(imgUrl)
        try {
            const blob = await res.blob()
            imgUrl = window.URL.createObjectURL(blob)
        } catch (e) {
            console.log('下载图片失败', e)
        }
        console.log('封面地址', imgUrl)

        // 时长
        // duration = 
        console.log('时长', duration)

        // 清晰度和大小
        // resolution = 
        console.log('清晰度', resolution)
        console.log('大小', '格式',)

        let av = {
            makerName: 'Brazzers',
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
    // }, 2000)
}