import { codify } from "../utils/codify";

export async function OnePondo(url) {
    // 定义页面元素
    let workName, seriesName, date, actress = [], code, imgUrl, duration
    // 仅在作品页生效
    if (url.includes('https://www.1pondo.tv/movies/')) {
        // 展开信息列表
        let showInfo = document.querySelector('button.see-more')
        console.info('展开按钮', showInfo)
        await showInfo.click()


        // 页面数据列表
        let infoList = document.querySelectorAll('.movie-detail > ul > li')
        console.log('数据列表', infoList);

        // 作品名
        workName = document.querySelector('.movie-overview h1').innerText

        // 系列名
        seriesName = infoList[2].querySelector('.spec-title').innerText.includes('シリーズ') ?
            infoList[2].querySelector('.spec-content').innerText : undefined

        // 日期
        date = infoList[0].querySelector('.spec-content').innerText

        // 演员列表
        let aList = infoList[1].querySelectorAll('.spec-content > span')
        aList.forEach(a => actress.push(a.innerText.trim()))

        // 番号
        code = url.match(/\d+_\d+/)[0]

        // 封面地址
        imgUrl = `https://www.1pondo.tv/assets/sample/${code}/str.jpg`

        // 时长
        duration = infoList[3].querySelector('.spec-content').innerText.replaceAll(':', '.')

        let av = {
            makerName: '1 Pondo',
            workName: workName,
            seriesName: seriesName,
            date: date,
            actress: actress,
            code: code,
            imgUrl: imgUrl,
            duration: duration
        }
        console.log('1 Pondo AV 对象', av)
        return av
    }
}