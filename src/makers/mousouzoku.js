export default async function Mousouzoku(url) {
	// 定义页面元素
	let makerName, workName, seriesName, date, actress = [], code, imgUrl, duration, resolution
	// 仅在作品页生效
	if (url.includes('https://www.mousouzoku-av.com/works/detail/')) {
		// 页面数据列表
		let infoList = document.querySelectorAll('dl.bx-info > dd')
		// let keyList = document.querySelectorAll('dl.info > dt')
		// keyList 是 NodeList，不是数组，先转换为数组，再取出其值
		// keyList = Array.from(keyList)
		console.log('数据列表', infoList)

		// 厂商名
		makerName = infoList[0].innerText
		console.log('厂商名', makerName)

		// 作品名
		workName = document.querySelector('h1.ttl-works').innerText
		console.log('作品名', workName)

		// 系列名
		// seriesName = infoList[3].querySelector('span').innerText === 'シリーズ' ? infoList[3].querySelector('span:last-child').innerText : undefined
		// console.log('系列名', seriesName)

		// 日期
		date = infoList[2].innerText
		console.log('日期', date)

		// 演员列表
		let aList = infoList[3].querySelectorAll('li')
		aList.forEach(a => actress.push(a.innerText))
		console.log('演员列表', actress)

		// 番号
		code = infoList[5].innerText
		console.log('番号', code)

		// 封面地址
		imgUrl = document.querySelector('.tmb-img').href
		// imgUrl = `https://www.caribbeancom.com${imgUrl.replace('url("', '').replace('")', '')}`
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
		// duration = infoList[2].querySelector('span:last-child').innerText
		// duration = duration.replace(/^00:/, '').replaceAll(':', '.')
		// console.log('时长', duration)

		// 清晰度和大小
		// resolution = 
		// console.log('清晰度', resolution)
		// console.log('大小', '格式',)

		let av = {
			makerName: makerName,
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