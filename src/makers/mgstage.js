// 厂商名转换列表
const MAKER_TRANS = {
}

export default async function MGS(url) {
    // 定义页面元素
    let makerName, workName, seriesName, date, actress = [], code, imgUrl, duration
    // 仅在作品页生效
    if (url.includes('https://www.mgstage.com/product/product_detail/')) {
        // 作品名
        workName = document.querySelector('.common_detail_cover h1').innerText
        console.log('作品名', workName)

        // 作品信息列表
        let keyList = document.querySelectorAll('.detail_data > table:last-child th')
        let valueList = document.querySelectorAll('.detail_data > table:last-child td')
        // keyList 是 NodeList，不是数组，先转换为数组，再取出其值
        keyList = [...keyList].map(key => {
            return key.innerText
        })
        console.log('数据列表', keyList, valueList)

        // 厂商名
        makerName = MAKER_TRANS[valueList[1].innerText] ?? valueList[1].innerText
        console.log('厂商名', makerName)

        // 系列名
        let seriesIndex = keyList.findIndex(key => key === 'シリーズ：')
        seriesName = valueList[seriesIndex].innerText  // 如果包含系列字段，说明有系列名称
        console.log('系列名', seriesIndex, seriesName)

        // 日期
        date = valueList[4].innerText
        console.log('日期', date)

        // 演员列表
        // let aList = infoList[1].querySelectorAll('.spec-content > span')
        // aList.forEach(a => actress.push(a.innerText.trim()))
        actress[0] = valueList[0].innerText
        console.log('演员列表', actress)

        // 番号
        code = valueList[3].innerText
        // let codeCap = code.match(/[a-z,A-Z]+/)?.[0].toLowerCase()
        // let codeNum = code.match(/[0-9]+/)?.[0]
        console.log('番号', code)

        // 封面地址
        imgUrl = document.querySelector('.detail_photo h2 img').src.replace('pf_o1', 'pb_e')
        const res = await fetch(imgUrl)
        try {
            const blob = await res.blob()
            imgUrl = window.URL.createObjectURL(blob)
        } catch (e) {
            console.log('下载图片失败', e)
        }
        console.log('封面地址', imgUrl)

        // 时长
        duration = valueList[2].innerText
        console.log('时长', duration)

        let av = {
            makerName: makerName,
            workName: workName,
            seriesName: seriesName,
            date: date,
            actress: actress,
            actressRealName: 'xxx',
            code: code,
            imgUrl: imgUrl,
            duration: duration
        }
        console.log('MGS AV 对象', av)
        return av
    }
}