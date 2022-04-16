// 厂商名转换列表
const makerJSON = `{
    "プレステージ": "Prestige"
}`

export default async function Prestige(url) {
    // 定义页面元素
    let makerName, workName, seriesName, date, actress = [], code, imgUrl, duration
    // 仅在作品页生效
    if (url.includes('https://www.prestige-av.com/goods/')) {
        // 作品信息列表
        let keyList = document.querySelectorAll('dl.spec_layout > dt')
        let infoList = document.querySelectorAll('dl.spec_layout > dd')
        // keyList 是 NodeList，不是数组，先转换为数组，再取出其值
        keyList = [...keyList].map(key => {
            return key.innerText
        })
        console.log('数据列表', keyList, infoList)

        // 厂商名
        let makerTrans = JSON.parse(makerJSON)
        makerName = makerTrans[infoList[3].innerText] ?? infoList[3].innerText

        // 作品名
        workName = document.querySelector('.product_title_layout_01 > h1').innerText.replace(/\＋\S+/, '')

        // 系列名
        seriesName = keyList.includes('シリーズ：') ? infoList[6].innerText : null  // 如果包含系列字段，说明有系列名称

        // 日期
        date = infoList[2].innerText

        // 演员列表
        // let aList = infoList[1].querySelectorAll('.spec-content > span')
        // aList.forEach(a => actress.push(a.innerText.trim()))
        actress[0] = infoList[0].innerText.trim()

        // 番号
        code = infoList[4].innerText
        let codeCap = code.match(/[a-z,A-Z]+/)?.[0].toLowerCase()
        let codeNum = code.match(/[0-9]+/)?.[0]
        console.log('番号', codeCap, codeNum)

        // 封面地址
        imgUrl = document.querySelector('.package_layout > a > img').src.replace('pf_p', 'pb_e')

        // 时长
        // duration = infoList[3].querySelector('.spec-content').innerText.replaceAll(':', '.')

        let av = {
            makerName: makerName,
            workName: workName,
            seriesName: seriesName,
            date: date,
            actress: actress,
            code: code,
            imgUrl: imgUrl,
            duration: duration
        }
        console.log('Prestige AV 对象', av)
        return av
    }
}