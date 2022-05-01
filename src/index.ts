import { createBtn } from './create-btn'
import { final } from './utils/final'
import { Madonna } from './makers/madonna'
import { NA } from './makers/naughty-america'
import { OnePondo } from './makers/1pondo'
import Prestige from './makers/prestige'
import TokyoHot from './makers/tokyo-hot'
import Brazzers from './makers/brazzers'

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
			case 'www.naughtyamerica.com': try { av = await NA(url) } catch (e) { }; break;
			case 'www.1pondo.tv': try { av = await OnePondo(url) } catch (e) { }; break;
			case 'www.prestige-av.com': try { av = await Prestige(url) } catch (e) { }; break;
			case 'my.tokyo-hot.com': try { av = await TokyoHot(url) } catch (e) { }; break;
			case 'www.brazzers.com': try {
				setTimeout(async () => {
					av = await Brazzers(url)
					if (av) {
						console.log('AV对象', av)
						try {
							a.download = await final(av)
							a.href = av.imgUrl
						} catch (e) {

						}
					}
				}, 2000)
			} catch (e) { }; break;
		}
	}

	trySwitch().then(
		async () => {
			if (av) {
				console.log('AV对象', av)
				try {
					a.download = await final(av)
					a.href = av.imgUrl
				} catch (e) {

				}
			}
		}
	)

	// if (autoSave === 'yes') {
	// 	a.click();
	// }

}

window.onload = async () => {
	try {
		await main()
	} catch (e) {
		console.log(e)
	}
}
