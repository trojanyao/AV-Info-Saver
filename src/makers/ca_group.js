import { codify } from "../utils/codify";

export default async function CA(url) {
	console.log('传入 URL', url)

	// 定义页面元素
	let makerName, workName, seriesName, date, actress = [], code, imgUrl

	// 仅在作品页生效
	if (url.includes('detail')) {
		// 厂商名
		switch (document.domain) {
			case 'attackers.net': makerName = 'Attackers'; break;
			case 'ideapocket.com': makerName = 'Idea Pocket'; break;
			case 'madonna-av.com': makerName = 'Madonna'; break;
			case 'moodyz.com': makerName = 'MOODYZ'; break;
			case 'premium-beauty.com': makerName = 'Premium'; break;
			case 's1s1s1.com': makerName = 'S1'; break;
			case 'honnaka.jp': makerName = '本中'; break;
			case 'mvg.jp': makerName = 'MVG'; break;
		}
		console.log('厂商名', makerName)

		// 作品名
		workName = document.querySelector('h2.p-workPage__title').innerText
		console.log('作品名', workName)

		// 页面数据列表
		let keyList = document.querySelectorAll('.p-workPage__table .th')
		let valueList = document.querySelectorAll('.p-workPage__table .th + div')
		console.log('数据列表', keyList, valueList)

		// 系列名
		seriesName = valueList[2].innerText
		console.log('系列名', seriesName)

		// 日期
		date = valueList[1].innerText
		console.log('日期', date)

		// 演员列表
		let aList = valueList[0].querySelectorAll('.item')
		actress = []
		aList.forEach(a => actress.push(a.innerText))
		console.log('演员列表', actress)

		// 番号
		let codePropIndex = Array.from(keyList).findIndex(key => key.innerText === '品番')
		console.log('番号索引', codePropIndex)
		let codePrefix = valueList[codePropIndex].querySelector('span').innerText
		code = valueList[codePropIndex].querySelector('p').innerText.replace(codePrefix, '')
		code = codify(code)
		console.log('番号', code)

		// 封面地址
		imgUrl = document.querySelectorAll('.swiper-wrapper img')[1].dataset.src
		// 跨域获取
		const res = await fetch(imgUrl)
		try {
			const blob = await res.blob()
			imgUrl = window.URL.createObjectURL(blob)
		} catch (e) {
			console.log('下载图片失败', e)
		}
		console.log('封面地址', imgUrl)

		let av = {
			makerName: makerName,
			workName: workName,
			seriesName: seriesName,
			date: date,
			actress: actress,
			code: code,
			imgUrl: imgUrl,
		}
		console.log(`${makerName} AV 对象`, av)
		return av
	}
}