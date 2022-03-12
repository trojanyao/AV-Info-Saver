// import { get } from './utils'
// import './style/main.less'
// import { add } from './example'
import { createBtn } from './create-btn'
import { final } from './utils/final'
import { Madonna } from './makers/madonna'
import { NA } from './makers/naughty-america'

async function main() {
	// 创建按钮
	let a = createBtn() 

	// 核心功能
	let domain = document.domain, url = document.URL;
	let av: any = {};
	console.log('域名', domain, url);
	async function trySwitch() {
		switch (domain) {
			case 'www.madonna-av.com': av = Madonna(url); break;
			case 'www.naughtyamerica.com':
				try {
					av = await NA(url)
				}catch(e) {

				}
				break;
		}
	}
	await trySwitch()

	if (av) {
		console.log('AV对象', av)
		try {
			a.download = await final(av)
			a.href = av.imgUrl
		} catch(e) {

		}
	}

	// if (autoSave === 'yes') {
	// 	a.click();
	// }

}

main().catch((e) => {
	console.log(e)
})
