export default async function Caribbean(url) {
    // 定义页面元素
    let workName, seriesName, date, actress = [], code, imgUrl, duration, resolution
    // 仅在作品页生效
    if (url.includes('https://www.caribbeancom.com/moviepages/')) {
        // 页面数据列表
        let infoList = document.querySelectorAll('.movie-info > ul > li')
        // let keyList = document.querySelectorAll('dl.info > dt')
        // keyList 是 NodeList，不是数组，先转换为数组，再取出其值
        // keyList = Array.from(keyList)
        console.log('数据列表', infoList)

        // 作品名
        workName = document.querySelector('.heading > h1').innerText
        console.log('作品名', workName)

        // 系列名
        seriesName = infoList[3].querySelector('span').innerText === 'シリーズ' ? infoList[3].querySelector('span:last-child').innerText : undefined
        console.log('系列名', seriesName)

        // 日期
        date = infoList[1].querySelector('span:last-child').innerText
        console.log('日期', date)

        // 演员列表
        let aList = infoList[0].querySelectorAll('a')
        aList.forEach(a => actress.push(a.innerText))
        console.log('演员列表', actress)

        // 番号
        code = url.match(/\d{6}-\d{3}/g)?.[0]
        console.log('番号', code)

        // 封面地址
        imgUrl = document.querySelector('.vjs-poster').style.backgroundImage
        imgUrl = `https://www.caribbeancom.com${imgUrl.replace('url("', '').replace('")', '')}`
        // 跨域获取
        // const res = await fetch(imgUrl)
        // try {
        //     const blob = await res.blob()
        //     imgUrl = window.URL.createObjectURL(blob)
        // } catch (e) {
        //     console.log('下载图片失败', e)
        // }
        console.log('封面地址', imgUrl)

        // 时长
        duration = infoList[2].querySelector('span:last-child').innerText
        duration = duration.replace(/^00:/, '').replaceAll(':', '.')
        console.log('时长', duration)

        // 清晰度和大小
        // resolution = 
        console.log('清晰度', resolution)
        console.log('大小', '格式',)

        let av = {
            makerName: '加勒比',
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