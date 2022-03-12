import { codify } from "../utils/codify";

export function Madonna(url) {
    // 定义页面元素
    let workName, seriesName, date, actress = [], code, imgUrl
    // 仅在作品页生效
    if (url.includes('https://www.madonna-av.com/works/detail/')) {
        // 页面数据列表
        let infoList = document.querySelectorAll('.works-detail-info > li');
        console.log('数据列表', infoList);

        // 作品名
        workName = document.querySelector('.page-main-title-tx').innerHTML;

        // 系列名
        seriesName = infoList[4].querySelector('a') ? infoList[4].querySelector('a').innerHTML : undefined;

        // 日期
        date = infoList[2].querySelector('a').innerHTML;

        // 演员列表
        let aList = infoList[0].querySelectorAll('li');
        actress = []
        aList.forEach(a => actress.push(a.innerText))

        // 番号
        code = infoList[7].innerHTML.match(/[a-z,A-Z]+\d+/)[0]
        code = codify(code)

        // 封面地址
        imgUrl = `https://www.madonna-av.com/contents/works/${code.replace('-', '').toLowerCase()}/${code.replace('-', '').toLowerCase()}-pl.jpg`;

        let av = {
            makerName: 'Madonna',
            workName: workName,
            seriesName: seriesName,
            date: date,
            actress: actress,
            code: code,
            imgUrl: imgUrl,
        }
        // console.log('Madonna AV 对象', av)
        return av
    }
}