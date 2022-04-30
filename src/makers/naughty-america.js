export async function NA(url) {
    // 定义页面元素
    let workName, seriesName, date, actress = [], code, duration, resolution = [], imgUrl
    // 仅在作品页生效
    if (url.includes('https://www.naughtyamerica.com/scene/')) {
        // 页面数据列表
        let infoList = document.querySelector('.scene-info');
        console.log('数据列表', infoList);

        // 作品名
        workName = document.querySelector('.scene-title').innerText;

        // 系列名
        seriesName = document.querySelector('.site-title').innerHTML;

        // 日期
        date = new Date(infoList.querySelector('.entry-date').innerText).toLocaleDateString('zh-CN');

        // 演员列表
        let aList = infoList.querySelectorAll('.performer-list > a');
        aList.forEach(a => actress.push(a.innerText))
        console.log('演员列表', actress)

        // 番号
        // code = infoList[7].innerHTML.match(/[a-z,A-Z]+\d+/)[0]
        // code = codify(code)

        // 封面地址
        imgUrl = `https:${document.querySelector('.play-trailer > picture > source').dataset.srcset}`.replace('webp', 'jpg');
        const res = await fetch(imgUrl)
        try {
            const blob = await res.blob()
            imgUrl = window.URL.createObjectURL(blob)
        } catch (e) {
            console.log('下载图片失败', e)
        }

        // 时长
        duration = infoList.querySelector('.duration').innerText.match(/\d+\ min/g)[0].replace(' ', '')

        let label = infoList.querySelectorAll('.flag-bg')
        label.forEach(l => {
            if (l.innerText === '4K') {
                resolution.push('4K')
            } else if (l.innerText === 'HD') {
                resolution.push('1080p')
            }
        })
        console.log('清晰度', resolution)

        let av = {
            makerName: 'Naughty America',
            workName: workName,
            seriesName: seriesName,
            date: date,
            actress: actress,
            code: code,
            duration: duration,
            resolution: resolution,
            imgUrl: imgUrl,
        }
        console.log('NA AV 对象', av)
        return av
    }
}